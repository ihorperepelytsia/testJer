<template lang="pug">
.mainContainer.outer
    #renderModule.mainContainer(:class="{'visible': SceneLoaded,'unvisible': !SceneLoaded}",ref="renderContainer")

</template>

<script>
import {
    InitThree,
    InitScene,
    frameRednererStart,
    SetScrollPage,
    SetScroll,
    SetMousePos,
    CheckResizingWindow,
    LoadCallBack,
    CameraController
} from '~/plugins/renderBuble.js';

function HandleScroll(e) {
    SetScroll(window.scrollY / (window.innerHeight * 2));
    return window.scrollY / (window.innerHeight * 2)
}

function HandleMouseMove(event) {
    let x = (event.clientX / window.innerWidth - 0.5) * 2;
    let y = (event.clientY / window.innerHeight - 0.5) * 2;
    SetMousePos(x, y);
}

export default {
    name: "render",
    data() {
        return {
            pageContainer: null,
            SceneLoaded: false,
            pause: false,
            stop0: 0,
            start1: 0.9,
            SceneData: {
                backgroundColor: 0x111111, // color of background
                buble: { // settings for buble
                    bubleColor: {
                        front: 0x00EFAB,
                        middle: 0x007FAB,
                        back: 0x002B00,
                    },
                    pointSize: 3.3,
                    rotationAnimSpeed: 0.0125, // sphere-points transform rotation speed (by all axis)
                },
                mouseSens: 0.025, // sens for rotation transform by mouse pos
                cameraFov: 50, // static camera fov
                aspectRationsForCalculatePositions: { // maket aspect ratio
                    mobile: 0.5625,
                    tablet: 0.6566637246,
                    desktop: 1.7733990,
                },
                cameraPositions: [ // camera "scenes"
                    {
                        x: 0, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: -30, y: 2, z: 128}, rot: {x: 0, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 0.07409124629080119, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 60, z: 20}, rot: {x: -20, y: 0, z: 0}},
                        }
                    },
                    { // начинает уезжать под экран
                        x: 0.1299146884272997, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 60, z: 20}, rot: {x: -18, y: 0, z: 0}},
                        }
                    },
                    { // начинает что то делать
                        x: 0.15754821958456974, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 60, z: 20}, rot: {x: 0, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 0.158, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 129, z: 20}, rot: {x: 0, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 0.16, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 129, z: 160}, rot: {x: 0, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 0.1668212166172107, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 129, z: 160}, rot: {x: 0, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 0.2771013519187, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: -96, z: 160}, rot: {x: 0, y: 0, z: 0}},//2042.2824
                        }
                    },
                    {
                        x: 0.28549836258292, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: -96, z: 0}, rot: {x: 0, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 0.2855, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                        }
                    },
                    // -------------------------------------------
                    // -------------------------------------------
                    // -------------------------------------------
                    // -------------------------------------------
                    // -------------------------------------------
                    {
                        x: 0.29389537324712, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 65, z: 200}, rot: {x: 0, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 0.411453522545973, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: -200, z: 200}, rot: {x: 0, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 0.95, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 60, z: 20}, rot: {x: -300, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 0.965656226383407, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 60, z: 20}, rot: {x: -380, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 1, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 0, z: 150}, rot: {x: -360, y: 0, z: 0}},
                        }
                    },
                    
                ],
                Optimization: {
                    minRenderResolution: 1,
                    maxRenderResolution: 1.75,
                    targetFPS: 50, // resolution = lerp(minRenderResolution,maxRenderResolution, _fps/targetFPS)
                    enableDynamicResolution: true, //if disabled - used maxRenderResolution, cant be changed on runtime, use UpdateSceneData(data) for update;
                }
            },
        }
    },

    // window.innerHeight -----  812   812 ---- 65 == 100%    1440 ---- 100%    1200 ---- 100%
    // x ----- 0.29389537324712        x  ---- y  == 100%     65 ----- 8%      96 ---- 8%  
    // pos ----- 65
    //                      vHeight/vWe        0.563888 ----- 65         0.563888 - 100%
    //                                                                   65 - x%     3248 - 100%
    //                                                                               x - 2.00012%
    // 11527.111    (65*100)/(900/1650)
    mounted() {
        const vHeight = window.innerHeight
        const vWidth = window.innerWidth

        let totalY = document.querySelector('.page').offsetHeight - window.innerHeight

        const s1 = document.querySelector('[data-block="0"]')
        const s2 = document.querySelector('[data-block="1"]')
        const s3 = document.querySelector('[data-block="2"]')
        const h1 = s1.offsetHeight

        const h2 = h1 + s2.offsetHeight + document.querySelector('[data-block="2"]').offsetHeight / 2
        const h3 = s1.offsetHeight + s2.offsetHeight - vHeight

        this.SceneData.cameraPositions[1].x = h1 / totalY // увеличивается и едет вниз
        this.SceneData.cameraPositions[2].x = (h2 - document.querySelector('[data-block="2"]').offsetHeight) / totalY // начинает уезжать под экран
        // this.SceneData.cameraPositions[3].x = (h2 - document.querySelector('[data-scroll-section-id="section2"]').offsetHeight + document.querySelector('[data-scroll-section-id="section2"]').offsetHeight / 10) / totalY
        this.SceneData.cameraPositions[4].x = h3 / totalY - 0.02
        this.SceneData.cameraPositions[5].x = h3 / totalY
        this.stop0 = this.SceneData.cameraPositions[6].x
        // this.SceneData.cameraPositions[3].x = 0.107

        // this.SceneData.cameraPositions[4].x = 0.108
        // this.SceneData.cameraPositions[5].x = 6000 / totalY
        // this.SceneData.cameraPositions[6].x = 6000 / totalY
        // this.SceneData.cameraPositions[7].x = 0
        // this.SceneData.cameraPositions[8].x = 0
        // this.SceneData.cameraPositions[9].x = 0
        // this.SceneData.cameraPositions[10].x = 0
        // this.SceneData.cameraPositions[11].x = 1
        // this.SceneData.cameraPositions[12].x = 1
        // this.SceneData.cameraPositions[13].x = 1

        

        // const block = document.querySelector('#get').offsetTop
        // console.log('lms')
        // const totalY = window.lmS.scroll.el.offsetHeight;
        // console.log(totalY - window.innerHeight)

        // this.SceneData.cameraPositions[9].x = (block - (vHeight + (vHeight/6)))/vHeight*0.1
        // this.SceneData.cameraPositions[10].x = (block - vHeight)/vHeight*0.1
        // this.SceneData.cameraPositions[11].x = (block - (vHeight - 700))/vHeight*0.1

        // this.SceneData.cameraPositions.forEach(element => {

        //     element.data.desktop.pos.y = (Number(((vHeight/vWidth)*(element.data.desktop.pos.y*100)/(812/1440))/100))
        //     element.x = Number(((vHeight/vWidth)*(element.x*100)/(812/1440))/100)
        //     // console.log('New-----', element.data.desktop.pos.y)
        //     // console.log('New', element.x)
        // });

        // this.SceneData.cameraPositions.forEach(element => {

        //     element.data.desktop.pos.y = Number((Number(prodElOffsetTop)*(element.data.desktop.pos.y*100)/3248)/100)
        //     element.x = Number(((vHeight/vWidth)*(element.x*100)/(812/1440))/100)
        //     console.log('New-----', element.data.desktop.pos.y)
        //     console.log('New', element.x)
        // });

        // this.SceneData.cameraPositions[10].data.desktop.pos.y = Number((Number(prodElOffsetTop)*2.00012)/100)




        // const prop = vHeight/vWidth
        // this.SceneData.cameraPositions[10].data.desktop.pos.y = Number((prop*11527.111766876)/100)
        // console.log(this.SceneData.cameraPositions[10].data.desktop.pos.y)
        // this.SceneData.cameraPositions[10].x = Number(((vHeight/vWidth)*52.119458686)/100)



         if(window.innerWidth >= 1200){
            window.lmS.on('scroll', (args) =>{
                this.getPosition(args.scroll.y,)
            })
        }


        if(window.innerWidth < 1200 && window.innerWidth >= 768) {
            this.SceneData.cameraPositions[0].data.desktop = {
                ...this.SceneData.cameraPositions[0].data.desktop,
                pos: {x: 30, y: -60, z: 300}
            }

            this.SceneData.cameraPositions[14].data.desktop = {
                ...this.SceneData.cameraPositions[14].data.desktop,
                pos: {x: 25, y: -37, z: 280}
            }

        } else if (window.innerWidth < 768) {
            this.SceneData.cameraPositions[0].data.desktop = {
                ...this.SceneData.cameraPositions[0].data.desktop,
                pos: {x: 18, y: -60, z: 320}
            }

            this.SceneData.cameraPositions[14].data.desktop = {
                ...this.SceneData.cameraPositions[14].data.desktop,
                pos: {x: 18, y: -40, z: 320}
            }
        }


        this.$nextTick(() => {
            InitThree(this.$refs.renderContainer, true);
            LoadCallBack(this.SetSceneLoaded);
            InitScene(this.SceneData);
            CameraController.SetAspectRatioForCameraPos(1.7733990);
            CameraController.SetCameraSceneByScrollPercent(0);

            window.addEventListener('mousemove', e => HandleMouseMove(e));
            //window.addEventListener('scroll', e => HandleScroll(e));

            window.lmS.on('scroll', args => {
                // console.log(args.scroll.y / (this.pageContainer.clientHeight - window.innerHeight))
                if(this.pageContainer){
                    let progressPercent = args.scroll.y / (this.pageContainer.clientHeight - window.innerHeight);
                    // console.log(progressPercent);
                    // console.log(args)
                    totalY = args.limit.y

                    // console.log(progressPercent)

                    if ((progressPercent >= this.stop0 && progressPercent < this.start1) && !this.pause) {
                        this.pause = true
                        CameraController.pause()
                        // console.log('stop')
                    }

                    if ((progressPercent < this.stop0 || progressPercent >= this.start1) && this.pause) {
                        this.pause = false
                        CameraController.play()
                        // console.log('play')
                    }
                    
                    if (!this.pause) {
                        CameraController.SetCameraSceneByScrollPercent(progressPercent)
                    }
                }
            })
        });
    },
    methods: {
        SetMainPageContainer(container){
            this.pageContainer = container;
            
            SetScrollPage(this.pageContainer);
        },
        SetSceneLoaded() {
            // console.log('SetSceneLoaded');
            this.SceneLoaded = true;
            frameRednererStart();
        },

        getPosition(y){
            // console.log(y)
        }
    }
}
</script>

<style lang="scss" scoped>


.unvisible {
    opacity: 0;
    transition: 1s;
}

.visible {
    opacity: 1;
    transition-delay: 1s;
    transition: 2s;
}

.mainContainer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

#renderModule {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
@media screen and (min-width: $tablet) {
    .outer {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100vw;
        height: auto;
        right: auto;
        bottom: auto;

        &:before {
            content: "";
            display: block;
            padding-top: 56.38%;
        }

        > * {
            width: 100% !important;
            height: 100% !important;
        }
    }

    #renderModule {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;

        & ::v-deep(canvas) {
            width: 100% !important;
            height: 100% !important;
        }
    }
}


#app {
    margin: 0 0;
    padding: 0;
}

</style>