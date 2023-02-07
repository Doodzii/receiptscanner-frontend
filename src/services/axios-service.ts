import axios from "axios";

export default {
    async scanPhoto(dataUrl : String) {

        let packet = {image: dataUrl};

        return new Promise(async(resolve) => {
            
            

            axios.post("http://localhost:8080/scanPhoto", packet)
                .then(res => {
                    resolve({res: res});
                })
                .catch(error => {
                    resolve({error: error})
                })



        })
    }
}