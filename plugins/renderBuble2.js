import * as THREE from "three";
import { FloatType } from "three";
import BubleTexture from "~/assets/textures/bubleTexture.png";

var localSceneData={
	originalData:true, //Disabled out controlls
	backgroundColor:0x111111, // color of background
	buble:{ // settings for buble
	bubleColor:{
		front:0x00EFAB,
		middle:0x007FAB,
		back:0x002B00,
	},
	pointSize: 2.5,
		rotationAnimSpeed: 0.0125, // sphere-points transform rotation speed (by all axis)
	},
	mouseSens: 0.05, // sens for rotation transform by mouse pos 
	cameraFov: 70, // static camera fov
	aspectRationsForCalculatePositions:{ // maket aspect ratio
		mobile:0.5625,
		tablet:0.6566637246,
		desktop:1.7733990,
	},
	cameraPositions:[ // camera "scenes" 
		{
			x:0, // x - percentage position (used by scroll percentage for example);
			data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
				mobile:{pos:{x:0,y:0,z:0},rot:{x:0,y:0,z:0}},
				tablet:{pos:{x:0,y:0,z:0},rot:{x:0,y:0,z:0}},
				desktop:{pos:{x:0,y:0,z:0},rot:{x:0,y:0,z:0}},
			}
		}
	],
	Optimization:{
		minRenderResolution: 1,
		maxRenderResolution: 2,
		targetFPS: 30, // resolution = lerp(minRenderResolution,maxRenderResolution, _fps/targetFPS)
		enableDynamicResolution: true, //if disabled - used maxRenderResolution, cant be changed on runtime, use UpdateSceneData(data) for update;
	}
  }

var scene,
	camera,
	cameraPivot,
	renderer,
	debugCanvas,
	bubleObject,
	canRenderer = false

var SceneLoadedDelegate;

let resolution = 1;//window.devicePixelRatio;//Resolution of render
let cameraFOV = 35; //FOV of camera (zoom)
let cameraDistance = 80; //Distance to model
let autoResize = true;

let smooth_mouseXYS = new THREE.Vector3(3,3,15);//smooth for input. Large > fast smooth, less > low smooth

let input_mouseXYS = new THREE.Vector3(0,0,0);//saved raw inputs (target fo smooth input)
let cur_mouseXYS = new THREE.Vector3(0,0,0);//factical input for animation system
let delta_mouseXYS = new THREE.Vector2(0,0);
let savedRenderSize = new THREE.Vector2(0,0);

let curCameraAnimTime = 0;
let speedCameraAnimTime = 0.1;
let curAnimId = -1;
let nextAnimId = -1;
let positionAspectRatio = -1;
let needAnimate = false;

let renderObjectId;

function Sphere() {
  
	const geo = new THREE.IcosahedronGeometry(40, 23);
	const material = new THREE.ShaderMaterial( {
	  uniforms: {
		time: { value: 0.0 },
		bubleTexture: { value: new THREE.TextureLoader().load(BubleTexture,function ( texture ) {
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.anisotropy =  renderer.capabilities.getMaxAnisotropy();
		}) },
		mouseDelta: { value: 0.0 },
		particleSize: { value: localSceneData.buble.pointSize * resolution },
		colorNear: { value: new THREE.Color(0xff0000) },
		colorMiddle: { value: new THREE.Color(0x00ff00) },
		colorFar: { value: new THREE.Color(0x0000ff) },
	  },
	  fragmentShader: fragmentShaderBuble(),
	  vertexShader: vertexShaderBuble(),
	  transparent: true,
	});

	//const material = new THREE.PointsMaterial( { size: 2, color: 0x00ff00 } );
	const sphere = new THREE.Points(geo, material);
	sphere.rotation.set(Math.PI*2*Math.random(), Math.PI*2*Math.random(), Math.PI*2*Math.random());
	return sphere;
  }

  function vertexShaderBuble() {
    return `#define GLSLIFY 1
    
    vec3 mod289_1_0(vec3 x)
    {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 mod289_1_0(vec4 x)
    {
      return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec4 permute_1_1(vec4 x)
    {
      return mod289_1_0(((x*34.0)+1.0)*x);
    }
    
    vec4 taylorInvSqrt_1_2(vec4 r)
    {
      return 1.79284291400159 - 0.85373472095314 * r;
    }
    
    vec3 fade_1_3(vec3 t) {
      return t*t*t*(t*(t*6.0-15.0)+10.0);
    }
    
    // Classic Perlin noise, periodic variant
    float pnoise_1_4(vec3 P, vec3 rep)
    {
      vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
      vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
      Pi0 = mod289_1_0(Pi0);
      Pi1 = mod289_1_0(Pi1);
      vec3 Pf0 = fract(P); // Fractional part for interpolation
      vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;
    
      vec4 ixy = permute_1_1(permute_1_1(ix) + iy);
      vec4 ixy0 = permute_1_1(ixy + iz0);
      vec4 ixy1 = permute_1_1(ixy + iz1);
    
      vec4 gx0 = ixy0 * (1.0 / 7.0);
      vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    
      vec4 gx1 = ixy1 * (1.0 / 7.0);
      vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    
      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    
      vec4 norm0 = taylorInvSqrt_1_2(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt_1_2(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;
    
      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);
    
      vec3 fade_xyz = fade_1_3(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
      return 2.2 * n_xyz;
    }
    
    
    
    uniform float time;
    uniform float mouseDelta;
    uniform float particleSize;

    varying vec2 vUv;
    varying vec3 pos;
    varying float noise;
    varying float dotFactor;
    varying vec3 debugColor;
    
    float fac = 10.0;
    
    float turbulence( vec3 p ) {

      float t = -.5;
    
      for (float f = 1.0 ; f <= 1.0 ; f++ ) {
        float power = pow( 2.0, f );
        t += abs(
          pnoise_1_4(
            vec3( power * p ),
            vec3( fac, fac, fac )
          ) / power
        );
      }
    
      return t;
    
    }
    
    void main() {

		//LOCAL PARAMETERS DEFINE
		
		float ANIM_SPEED = 0.25;
		vec3 SCALE_NOISE_0 = vec3(0.05);
		vec3 ANIM_NOISE_0 = vec3(0.5);
		vec3 OFFSET_NOISE_0 = vec3(1.,.5,.0);
		vec3 OFFSET_2_NOISE_0 = vec3(1.,.5,.0);
		float displacementOffsetStrench = 2.;
    
      vUv = uv * 200.0;

	  float LOCAL_TIME =  time * ANIM_SPEED;

      //noise = 10.0 *  -.10 * turbulence( .5 * normalize(position*SCALE_NOISE_1) + LOCAL_TIME );
		
	  
      float normalX = pnoise_1_4( position*SCALE_NOISE_0*0.5 + ANIM_NOISE_0*LOCAL_TIME*0.5 + vec3(0.5,0.,0.), vec3( 100.) );
	  float normalY = pnoise_1_4( position*SCALE_NOISE_0*0.5 + ANIM_NOISE_0*LOCAL_TIME*0.5 + vec3(0,0.5,0.), vec3( 100.) );
	  float normalZ = pnoise_1_4( position*SCALE_NOISE_0*0.5 + ANIM_NOISE_0*LOCAL_TIME*0.5 + vec3(0.0,0.,0.5), vec3( 100.) );
	  float t = clamp(turbulence(normalize(position*SCALE_NOISE_0) + LOCAL_TIME ),-1.,1.);
	  vec3 displacementNormal = normalize(vec3(normalX,normalY,normalZ)*(0.5 + 0.5*t));
	  displacementNormal = displacementNormal * pow((1. - abs(dot(normalize(position),displacementNormal))),2.0);
	  
      float b = pnoise_1_4( position*SCALE_NOISE_0*0.75 + ANIM_NOISE_0*LOCAL_TIME, vec3( 100.) );
      float c = pnoise_1_4( position*SCALE_NOISE_0 + ANIM_NOISE_0*(LOCAL_TIME+2.*pow(b,2.0)*ANIM_SPEED), vec3( 100.) );
	  
      float noise_d = pnoise_1_4( position*SCALE_NOISE_0*5. + 5.*ANIM_NOISE_0*LOCAL_TIME, vec3( 100.) );
	  float d = 0.3*pnoise_1_4( vec3(2.5,2.5,2.5) + 5.*ANIM_NOISE_0*LOCAL_TIME, vec3( 100.) );
	  debugColor = vec3(0.0);

      float displacement = pow(c,2.)*5.*(1.+2.*d*noise_d);
	  noise = displacement;

      vec3 newPosition = position + (normalize(position) * displacement + displacementNormal*displacementOffsetStrench);
      pos = newPosition;
    
      vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );
	  
	  vec4 worldPosition = modelMatrix * vec4(newPosition,1.0);

	  float dot = dot(normalize(worldPosition.xyz),normalize(worldPosition.xyz-cameraPosition));
	  dotFactor = dot;
	  float localSize = particleSize * ( 0.25 + 0.75*pow(clamp(dot-0.25,0.0,1.0),0.75) + b*0.15 + 0.3*d*noise_d);

      gl_PointSize = localSize * (300. / -mvPosition.z);
      
      gl_Position = projectionMatrix * mvPosition;
      
    
    }
    `
    }
    
    function fragmentShaderBuble() {
    return `#define GLSLIFY 1
    varying vec2 vUv;
    varying float noise;
    varying vec3 pos;
    varying float dotFactor;
    varying vec3 debugColor;

    uniform float time;
    uniform sampler2D bubleTexture;
	uniform vec3 colorNear;
	uniform vec3 colorMiddle;
	uniform vec3 colorFar;
    
    void main() {
      // black and white
      vec3 blackAndWhite = vec3(noise - 1.);

	  float colorFactor = 0.0;

	  //Calculate Colors and mask
	  colorFactor = pow(clamp(dotFactor,0.0,1.0),1.25)*1.5;
	  colorFactor = colorFactor + 0.2*(noise - 1.);
	  colorFactor = clamp(1.0-colorFactor,0.0,1.0);
	  
	  float alphaFactor = clamp(dotFactor+0.2,0.,1.0) / 0.75;
	  alphaFactor = pow(alphaFactor,2.0);

	  vec3 colorGradient = vec3(0.,0.,0.);
	  if(colorFactor < 0.5){
		vec3 colorNear2MiddleDif = colorMiddle-colorNear;
		colorGradient = colorNear + colorNear2MiddleDif*(colorFactor/0.5);
	  }else{
		vec3 colorMiddle2FarDif = colorFar-colorMiddle;
		colorGradient = colorMiddle + colorMiddle2FarDif*((colorFactor-0.5)*2.0);
	  }

	 	//colorGradient = colorGradient+ 0.3*colorMiddle*(noise - 1.);
	 	//colorGradient = clamp(colorGradient,0.0,1.0);

	  vec4 finalColor = vec4(colorGradient, clamp(sign(alphaFactor-0.01),0.,1.0));
	  //vec4 finalColor = vec4(blackAndWhite, clamp(sign(alphaFactor-0.01),0.,1.0));

      gl_FragColor = finalColor * texture2D( bubleTexture, gl_PointCoord );
    
      if ( gl_FragColor.a < 0.5 ) discard;
    
    }`
    }

//Timing block
var sceneTiming = {
	//Date.now()
	sceneTime: 0,
	deltaTime: 0.001,
	oldTick: Date.now(),
};

let setedResolution = false

function InitThree(renderView, autoResizing) {
	autoResize = autoResizing;
	renderObjectId = renderView.getAttribute("id");
	savedRenderSize.x = document.getElementById(renderObjectId).clientWidth;
	savedRenderSize.y = document.getElementById(renderObjectId).clientHeight;

	// console.log("savedRenderSize",savedRenderSize);

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(savedRenderSize.x*resolution, savedRenderSize.y*resolution);
	renderer.setClearColor(0x000000, 1);

	renderer.domElement.setAttribute("class", "renderer-view");
	renderView.appendChild(renderer.domElement);
}

function UpdateSceneData(sceneData){
	if(sceneData){
		localSceneData = sceneData;
	}

	renderer.setClearColor(localSceneData.backgroundColor, 0);
	camera.fov = localSceneData.cameraFov;
	camera.updateProjectionMatrix();

	if(bubleObject && bubleObject.material){
		bubleObject.material.uniforms.colorNear.value = new THREE.Color(localSceneData.buble.bubleColor.front);
		bubleObject.material.uniforms.colorMiddle.value = new THREE.Color(localSceneData.buble.bubleColor.middle);
		bubleObject.material.uniforms.colorFar.value = new THREE.Color(localSceneData.buble.bubleColor.back);
	}

	if(!localSceneData.Optimization.enableDynamicResolution){
		resolution = localSceneData.Optimization.maxRenderResolution;
		renderer.setSize(savedRenderSize.x*resolution, savedRenderSize.y*resolution);
		bubleObject.material.uniforms.particleSize.value = localSceneData.buble.pointSize * resolution * (savedRenderSize.y/812);
	}
}

async function InitScene(sceneData) {

	let renderObject = document.getElementById(renderObjectId);
	camera = new THREE.PerspectiveCamera(cameraFOV, renderObject.clientWidth/renderObject.clientHeight, 0.1, 1000);
	cameraPivot = new THREE.Object3D();
	scene.add(cameraPivot);
	scene.add(camera);

	camera.position.set(
		0,
		0,
		0
	);

	camera.parent = cameraPivot;
	UpdateSceneData(sceneData);
	CheckResizingWindow(true);

	bubleObject = Sphere();
	scene.add(bubleObject);
	
	sceneTiming.sceneTime += Math.random()*100;

	UpdateSceneData();

	//_SetCameraSceneById(0);
	//_StartCameraSceneAnimateById(2);

	SceneLoadedDelegate();
}

function frameRednererStart() {
	canRenderer = true;
	frameUpdate();
}

function frameRednererStop() {
	canRenderer = false;
}

function SmoothAnim(cur, target, percentage, deltaTime, tolerance, deltaTimeLagIgnore){
	if(deltaTime < 0.5){
		let result = cur + (target-cur)*percentage*deltaTime;
		if(Math.abs(result - target) <= tolerance){
			result = target;
		}
		return result;
	}else{//if FPS less 2 and if page switched or paused
		if(deltaTimeLagIgnore){
			let result = cur + (target-cur)*percentage*0.5;
			if(Math.abs(result - target) <= tolerance){
				result = target;
			}
			return result;
		}else{
			return target;
		}
	}
}

function InputToCur(){
	//SMOOTHING INPUTS
	let oldMousePos = new THREE.Vector2(cur_mouseXYS.x,cur_mouseXYS.y);
	cur_mouseXYS.set(
		SmoothAnim(cur_mouseXYS.x,input_mouseXYS.x, smooth_mouseXYS.x, sceneTiming.deltaTime,0.0001),
		SmoothAnim(cur_mouseXYS.y,input_mouseXYS.y, smooth_mouseXYS.y, sceneTiming.deltaTime,0.0001),
		SmoothAnim(cur_mouseXYS.z,input_mouseXYS.z, smooth_mouseXYS.z, sceneTiming.deltaTime,0.0001)
	);
	delta_mouseXYS = new THREE.Vector2(cur_mouseXYS.x-oldMousePos.x,cur_mouseXYS.y-oldMousePos.y);
}

function FaceScrollAnim(){
}

//UPDATE RENDER

//let debugTimer = 0;
function frameUpdate() {
	//debugTimer = debugTimer + 1;
	//PAGE RESIZE
	if(autoResize){
		CheckResizingWindow();
	}

	if (canRenderer) {
		requestAnimationFrame(frameUpdate);
	}

	//DELTA TIME
	sceneTiming.deltaTime = (Date.now() - sceneTiming.oldTick) / 1000;
	if(sceneTiming.deltaTime < 0.001){
		sceneTiming.deltaTime = 0.001;
	}
	sceneTiming.oldTick = Date.now();
	sceneTiming.sceneTime += sceneTiming.deltaTime;

	//APPLY SCROLLS
	if(scrollPage){
		let yScroll = -scrollPage.getBoundingClientRect().y;
		
	//console.log(document.getElementById('tariffs').getBoundingClientRect().y);
		if(yScroll>0){
			let progressPercent = yScroll / (scrollPage.clientHeight - window.innerHeight);
			//console.log('progressPercent',progressPercent);
			CameraController.SetCameraSceneByScrollPercent(progressPercent);
		}
	}

	//DYNCAMIC RENDER RESOLUTION
	if(localSceneData.Optimization.enableDynamicResolution && !setedResolution){
		setedResolution = true
		resolution = MATH_Clamp((1/sceneTiming.deltaTime)/localSceneData.Optimization.targetFPS,0.5,1.0);
		resolution = MATH_Lerp(localSceneData.Optimization.minRenderResolution, localSceneData.Optimization.maxRenderResolution, resolution);
		renderer.setSize(savedRenderSize.x*resolution, savedRenderSize.y*resolution);
		bubleObject.material.uniforms.particleSize.value = localSceneData.buble.pointSize * resolution * (savedRenderSize.y/812);
	}
	//INPUT SMOOTH
	InputToCur();

	//BUBLE ANIM

	bubleObject.material.uniforms.time.value = +sceneTiming.sceneTime;
	bubleObject.rotation.set(-cur_mouseXYS.y*localSceneData.mouseSens,-cur_mouseXYS.x*localSceneData.mouseSens,0.0);
	bubleObject.rotateX(localSceneData.buble.rotationAnimSpeed*sceneTiming.sceneTime);
	bubleObject.rotateY(localSceneData.buble.rotationAnimSpeed*sceneTiming.sceneTime);
	bubleObject.rotateZ(localSceneData.buble.rotationAnimSpeed*sceneTiming.sceneTime);
	bubleObject.material.uniforms.mouseDelta.value = delta_mouseXYS.length();

	//CAMERA POS ANIM

	__CameraPositionAnimate();

	//RENDER
	
	renderer.render(scene, camera);
}

//INPUTS

function SetScroll(scroll){
	let input_scroll = Math.min(Math.max(scroll, 0), 1);
	
	input_mouseXYS.set(input_mouseXYS.x,input_mouseXYS.y,input_scroll);
}

function SetMousePos(x,y){
	
	let input_mouseX = Math.min(Math.max(x, -1), 1);
	let input_mouseY = Math.min(Math.max(y, -1), 1);

	input_mouseXYS.set(input_mouseX,input_mouseY,input_mouseXYS.z);
}

function MATH_Lerp(a,b,time){
	if(a.x != undefined || b.x != undefined){
		if(a.y != undefined && a.z == undefined && b.y != undefined && b.z == undefined){
			var xDif = b.x - a.x;
			var yDif = b.y - a.y;
			
			
			var res = new THREE.Vector3(a.x+xDif*time,a.y+yDif*time);
			
			return res;
		}else if(a.y != undefined && a.z != undefined && b.y != undefined && b.z != undefined){
			var xDif = b.x - a.x;
			var yDif = b.y - a.y;
			var zDif = b.z - a.z;
			
			var res = new THREE.Vector3(a.x+xDif*time,a.y+yDif*time,a.z+zDif*time);

			return res;
		}else{
			return 0;
		}
	}else{
		time = MATH_Clamp01(time);
		var dif = b-a;
	
		var result = a+dif*time;
	
		return result;
	}
}

function MATH_Clamp01(value){
	if(!value){
		return 1;
	}
	return MATH_Clamp(value, 0.0, 1.0);
}

function MATH_Clamp(value, min, max){
	if(!value){
		return 1;
	}
	if(value >= max){
		value = max;
	}else if(value <= min){
		value = min;
	}
	return value;
}

function MATH_GetTimeOfLerp(value, minV, maxV){
	var diff = maxV-minV;
	if(Math.abs(diff) < Math.minValue){
		return minV;
	}
	var result = MATH_Clamp01((value-minV)/diff);

	return result;
}

function MATH_ValueInRange(value, min, max){
	return (value >= min && value < max);
}

function MATH_LinearCurve(value, points){
	if(points.length < 2){
		if(points.length < 1){
			return 1;
		}else{
			return points[0].y;
		}
	}
	
	var lastID = points.length-1;

	var minValue = points[0].x;
	var maxValue = points[lastID].x;
	if(maxValue < minValue){
		console.warn('MATH_LinearCurve: First point x value < First point x value (Not "Left To Right" curve), return 1')
		return 1;
	}

	if(value <= minValue){
		return points[0].y;
	}else if(value >= maxValue){
		return points[lastID].y;
	}


	for (let index = 0; index < points.length-1; index++) {
		const elementNow = points[index];
		const elementNext = points[index+1];
		
		if(MATH_ValueInRange(value,elementNow.x,elementNext.x)){
			return MATH_Lerp(elementNow.y,elementNext.y,MATH_GetTimeOfLerp(value,elementNow.x,elementNext.x));
		}
	}
}

function MATH_RENDER_LinearCurve(canvas, offset, scale, colorBack, colorAxis, colorCurve, oprimize, points){
	if(debugCanvas){
		//background
		canvas.fillStyle = colorBack;
		canvas.fillRect(0, 0, 1000,500);
		//drawAxis
		canvas.beginPath();
		canvas.strokeStyle= colorAxis;
		//Y
		canvas.moveTo(0, 250+offset.y);
		canvas.lineTo(1000, 250+offset.y);
		//X
		canvas.moveTo(offset.x, 0);
		canvas.lineTo(offset.x, 500);
		//
		canvas.stroke()

		
		//drawCurveLine
		canvas.beginPath();
		canvas.strokeStyle = colorCurve;
		var maxX = 1000/oprimize;
		
		for (let index = 0; index < maxX; index++) {
			
			var pointX = offset.x + scale.x*index*oprimize;
			var pointY = MATH_LinearCurve(pointX,points);
			if(index == 0){
				canvas.moveTo(0,250+offset.y-scale.y*pointY);
			}
			canvas.lineTo((index+1)*oprimize,250+offset.y-scale.y*pointY);
		}
		canvas.lineWidth = 4;
		canvas.stroke()
		
	}
}

function CheckResizingWindow(cameraSetup){
	let nowW = document.getElementById(renderObjectId).clientWidth;
	let nowH = document.getElementById(renderObjectId).clientHeight;
	
	if(savedRenderSize.x != nowW || savedRenderSize.y != nowH || cameraSetup){

		var newAspect = (nowW/nowH);

		if(positionAspectRatio < 0){
			positionAspectRatio = -newAspect;
		}

		camera.aspect = newAspect;
		camera.updateProjectionMatrix();

		renderer.setSize(nowW*resolution,nowH*resolution);

		savedRenderSize.x = nowW;
		savedRenderSize.y = nowH;
	}
}

function LoadCallBack(method){
	//MATH_RENDER_LinearCurve(debugCanvas,{x:0,y:0},{x:0.002,y:70},"rgb(100,100,100)","rgb(255,0,0)","rgb(255,255,255)", 100, aspectActionPoints);

	// console.log('LoadCallBack',method);
	SceneLoadedDelegate = method;
}

function SendComand(commandId, data){
	switch(commandId){
	}
}

function AddDebugCanvas(canvas){
	// console.log('AddDebugCanvas',canvas);
	debugCanvas = canvas;
}

function _SetCameraPos(pos){
	if(pos == undefined || pos.x == undefined || pos.y == undefined || pos.z == undefined){
		console.warn('_SetCameraPos: pos value should be Vector3 object and have x,y,z parameters')
		return;
	}
	cameraPivot.position.set(pos.x,pos.y,pos.z);
}

function MATH_DegToRad(rad){
	return (rad*Math.PI/180.0);
}

function _SetCameraRotate(rot){
	if(!rot || rot.x == undefined || rot.y == undefined || rot.z == undefined){
		console.warn('_SetCameraRotate: rot value should be Vector3 object and have x,y,z parameters')
		return;
	}
	camera.rotation.set(MATH_DegToRad(rot.x),MATH_DegToRad(rot.y),MATH_DegToRad(rot.z));
}

function _SetCameraTransform(pos,rot){
	_SetCameraPos(pos);
	_SetCameraRotate(rot);
}

function _SetCameraSceneById(id){
	
	curAnimId = id;

	if(__CheckCameraSceneId(id)){
		//positionAspectRatio

		var newPosByAspect = __GetCameraPositionByIDAndAspect(id,Math.abs(positionAspectRatio));
		var newRotByAspect = __GetCameraRotationByIDAndAspect(id,Math.abs(positionAspectRatio));
		
		_SetCameraTransform(newPosByAspect,newRotByAspect);
	}else{
		console.warn('_SetCameraSceneById: id out of camera positions range');
	}
}

function __GetCameraPositionByIDAndAspect(id, aspect){
	return MATH_LinearCurve(aspect, [
		{x:localSceneData.aspectRationsForCalculatePositions.mobile, y: localSceneData.cameraPositions[id].data.mobile.pos},
		{x:localSceneData.aspectRationsForCalculatePositions.tablet, y: localSceneData.cameraPositions[id].data.tablet.pos},
		{x:localSceneData.aspectRationsForCalculatePositions.desktop, y: localSceneData.cameraPositions[id].data.desktop.pos},]);
}

function __GetCameraRotationByIDAndAspect(id, aspect){
	return MATH_LinearCurve(aspect, [
		{x:localSceneData.aspectRationsForCalculatePositions.mobile, y: localSceneData.cameraPositions[id].data.mobile.rot},
		{x:localSceneData.aspectRationsForCalculatePositions.tablet, y: localSceneData.cameraPositions[id].data.tablet.rot},
		{x:localSceneData.aspectRationsForCalculatePositions.desktop, y: localSceneData.cameraPositions[id].data.desktop.rot},]);
}

function __CheckCameraSceneId(id){
	if(id < localSceneData.cameraPositions.length){
		return true;
	}else{
		return false;
	}
}

function _SetCameraSceneByScrollPercent(percent){

	var animData = __GetCameraScenePrevNextIdTimeByScroll(percent);

	curCameraAnimTime = animData.time;
	curAnimId = animData.prevId;
	nextAnimId = animData.nextId;
	
	_SetCameraSceneLerpById(curAnimId,nextAnimId,curCameraAnimTime);
}

function __GetCameraScenePrevNextIdTimeByScroll(value){
	var points = [localSceneData.cameraPositions.length];

	localSceneData.cameraPositions.forEach((element,id) => {
		points[id] = {x:element.x,y:id};
	});

	if(points.length < 2){
		console.warn('MATH_LinearCurve: SceneData.cameraPositions have less 2 points')
		return {
			prevId: 0,
			nextId: 0,
			time: 0
		}
	}
	
	var lastID = points.length-1;

	var minValue = points[0].x;
	var maxValue = points[lastID].x;
	if(maxValue < minValue){
		console.warn('MATH_LinearCurve: First point x value < First point x value (Not "Left To Right" curve), return 1')
		return 1;
	}

	if(value <= minValue){
		return {
			prevId: 0,
			nextId: 0,
			time: 0
		}
	}else if(value >= maxValue){
		return {
			prevId: lastID,
			nextId: lastID,
			time: 1
		}
	}


	for (let index = 0; index < points.length-1; index++) {
		const elementNow = points[index];
		const elementNext = points[index+1];
    
		if(MATH_ValueInRange(value,elementNow.x,elementNext.x)){
			return {
				prevId: index,
				nextId: index + 1,
				time: MATH_GetTimeOfLerp(value,elementNow.x,elementNext.x)
			}
		}
	}

	
	
	// console.log('_SetCameraSceneByScrollPercent????',value);
}

function _SetCameraSceneLerpById(oldSceneId, targetSceneId, lerpTime){
	if(oldSceneId < 0 || targetSceneId < 0){
		return;
	}

	curCameraAnimTime = lerpTime;
	curAnimId = oldSceneId;
	nextAnimId = targetSceneId;
	
	var newPosByAspectA = __GetCameraPositionByIDAndAspect(oldSceneId,Math.abs(positionAspectRatio));
	var newRotByAspectA = __GetCameraRotationByIDAndAspect(oldSceneId,Math.abs(positionAspectRatio));
	
	var newPosByAspectB = __GetCameraPositionByIDAndAspect(targetSceneId,Math.abs(positionAspectRatio));
	var newRotByAspectB = __GetCameraRotationByIDAndAspect(targetSceneId,Math.abs(positionAspectRatio));

	_SetCameraTransform(MATH_Lerp(newPosByAspectA,newPosByAspectB,lerpTime),MATH_Lerp(newRotByAspectA,newRotByAspectB,lerpTime));
}

function _StartCameraSceneAnimateById(targetSceneId){
	needAnimate = true;
	curCameraAnimTime = 0;
	if(curAnimId < 0){
		curAnimId = 0;
	}
	nextAnimId = targetSceneId;
}

function _StartCameraSceneAnimateByPercent(percent){
	var animData = __GetCameraScenePrevNextIdTimeByScroll(percent);

	needAnimate = true;
	curCameraAnimTime = 0;
	if(curAnimId < 0){
		curAnimId = 0;
	}
	nextAnimId = animData.time > 0.5 ? animData.nextAnimId : animData.curAnimId;
}

function __CameraPositionAnimate(){
	if(needAnimate){
		if(curCameraAnimTime > 1){
			needAnimate = false;
			return;
		}

		curCameraAnimTime = curCameraAnimTime + sceneTiming.deltaTime*speedCameraAnimTime;
		_SetCameraSceneLerpById(curAnimId,nextAnimId,curCameraAnimTime);
	}
}

function _EnableDynamicAspectRatioForCameraPos(){
	positionAspectRatio = -1;
}

function _SetAspectRatioForCameraPos(ratio){
	positionAspectRatio = MATH_Clamp(Math.abs(ratio), Math.minValue, 10);
}

function canOutControlls(){
	if(localSceneData == undefined || localSceneData.originalData){
		return false;
	}else{
		return true;
	}
	
}

let scrollPage;
function SetScrollPage(mainPage){
	scrollPage = mainPage;
}

const CameraController = {
	SetCameraPos: (pos) => {
		if(canOutControlls()){
			needAnimate = false;_SetCameraPos(pos)}},
	SetCameraRotate: (rot) => {if(canOutControlls()){
		needAnimate = false;_SetCameraRotate(rot)}},
	SetCameraTransform: (pos,rot) => {if(canOutControlls()){
		needAnimate = false;_SetCameraTransform(pos,rot)}},
	SetCameraSceneById: (id) => {if(canOutControlls()){
		needAnimate = false;_SetCameraSceneById(id)}},
	SetCameraSceneByScrollPercent: (percent) => {if(canOutControlls() && !isNaN(percent)){
		needAnimate = false;_SetCameraSceneByScrollPercent(percent)}},
	SetCameraSceneLerpById: (oldSceneId, targetSceneId, lerpTime) => {if(canOutControlls()){
		needAnimate = false;_SetCameraSceneLerpById(oldSceneId, targetSceneId, lerpTime)}},
	StartCameraSceneAnimateById: (targetSceneId) => {if(canOutControlls()){_StartCameraSceneAnimateById(targetSceneId)}},
	StartCameraSceneAnimateByPercent: (targetPercent) => {if(canOutControlls()){_StartCameraSceneAnimateByPercent(targetPercent)}},
	EnableDynamicAspectRatioForCameraPos: () => {if(canOutControlls()){_EnableDynamicAspectRatioForCameraPos()}},
	SetAspectRatioForCameraPos: (ratio) => {if(canOutControlls()){_SetAspectRatioForCameraPos(ratio)}},
	pause: () => { frameRednererStop() },
	play: () => { frameRednererStart() }
}

export { InitThree, InitScene, frameRednererStart, SetScroll, SetMousePos, CheckResizingWindow, LoadCallBack, SendComand, AddDebugCanvas,CameraController, SetScrollPage};