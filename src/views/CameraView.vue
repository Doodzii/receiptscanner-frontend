<script lang="ts">
import AxiosService from "@/services/axios-service";
import SocketService from "@/services/socket-service";

const constraints = {
    audio: false,
    video: true
}

export default {
    mounted() {
        this.createCamera();

    },
    data() {
        return {
            cameraWidth: 640,
            cameraHeight: 480,
            imageData: null
        }
    },

    methods: {
        

        createCamera() {

            const constraints = {
                audio: false,
                video: true
            }

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(stream => {
                    this.getCamera().srcObject = stream;
                })

            
        },
        
        capture() {
            
            const photo = this.$refs.photo as any;
            const context = photo.getContext("2d");
            context.drawImage(this.$refs.camera, 0, 0, this.cameraWidth, this.cameraHeight);

            this.imageData = photo.toDataURL("image/jpeg");
            if (this.imageData == null) return;
            AxiosService.scanPhoto(this.imageData).then((res : any) => {
                console.log(res.res);
            });

        },
        resend() {
            if (this.imageData == null) return;
            AxiosService.scanPhoto(this.imageData).then((res : any) => {
                console.log(res.res);
            });
        },
        

        getCamera() : any {
            return this.$refs.camera;
        }

    }
}
</script>

<template>
  <main>
    
    <h1 class="header">Camera test</h1>

    <video class="camera" :width="cameraWidth" :height="cameraHeight" ref="camera" autoplay></video>

    <button class="screenshot" @click="capture()">Screenshot</button>
    <button class="resend" @click="resend()">Resend</button>

    <canvas id="photo" ref="photo" :width="cameraWidth" :height="cameraHeight"></canvas>
    <!-- <input :value="imageData" style="width: 700px;"> -->
    
  </main>
</template>

<style>

main {
    display: grid;
    align-content: center;
    justify-content: center;
}   


.header {
    padding: 0;
    margin: 0;
    text-align: center;
    margin-bottom: 20px;
    color: rgb(50, 229, 50);
    grid-row: 1;
}

.camera {
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: red;
    grid-row: 2;
}

#photo {
    background-color: red;
    grid-row: 4;
}

.screenshot {
    font-size: 20px;
    background-color: rgb(50, 229, 50);
    color: white;
    border-radius: 10px;
    cursor: pointer;
    border: 0px;
    width: 200px;
    height: 50px;
    margin-bottom: 20px;
    grid-row: 3;
    grid-column: 1;
}

.resend {
    margin-left: 70%;
    font-size: 20px;
    background-color: rgb(50, 229, 217);
    color: white;
    border-radius: 10px;
    cursor: pointer;
    border: 0px;
    width: 200px;
    height: 50px;
    margin-bottom: 20px;
    grid-row: 3;
    grid-column: 1;
}
</style>