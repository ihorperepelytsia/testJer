<template lang="pug">
.mainContainer
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
                    {
                        x: 0.1299146884272997, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 0, y: 60, z: 20}, rot: {x: -18, y: 0, z: 0}},
                        }
                    },
                    {
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
                            desktop: {pos: {x: 7, y: 129, z: 160}, rot: {x: 0, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 0.1668212166172107, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 7, y: 129, z: 160}, rot: {x: 0, y: 0, z: 0}},
                        }
                    },
                    {
                        x: 0.2226446587537092, // x - percentage position (in float) (used by scroll percentage for example);
                        data: { // camera transform data //Lerp linear position interpolation by aspect ratio, dynamic aspect ratio can be disabled by CameraController.SetAspectRatioForCameraPos(aspect);
                            mobile: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            tablet: {pos: {x: 0, y: 0, z: 0}, rot: {x: 0, y: 0, z: 0}},
                            desktop: {pos: {x: 7, y: 15, z: 160}, rot: {x: 0, y: 0, z: 0}},
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
    mounted() {
        this.$nextTick(() => {
            InitThree(this.$refs.renderContainer, true);
            LoadCallBack(this.SetSceneLoaded);
            InitScene(this.SceneData);
            CameraController.SetAspectRatioForCameraPos(1.7733990);
            CameraController.SetCameraSceneByScrollPercent(0);

            window.addEventListener('mousemove', e => HandleMouseMove(e));
            //window.addEventListener('scroll', e => HandleScroll(e));

            // window.lmS.on('scroll', args => {
            //     if(this.pageContainer){
            //         let progressPercent = args.scroll.y / (this.pageContainer.clientHeight - window.innerHeight);
            //         console.log('progressPercent',this.pageContainer.getBoundingClientRect().y,args.scroll.y);
            //         CameraController.SetCameraSceneByScrollPercent(progressPercent)
            //     }
            // })
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

    & ::v-deep(canvas) {
        width: 100% !important;
        height: 100% !important;
    }
}


#app {
    margin: 0 0;
    padding: 0;
}

</style>