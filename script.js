const uploadBox = document.querySelector('.upload-box');
const fileInput = uploadBox.querySelector('input');
const previeImg = uploadBox.querySelector('img');
const widthInput = document.querySelector('.width input');
const heightInput = document.querySelector('.height input');
const ratioInput = document.querySelector('.ratio input');
const downloadBtn = document.querySelector('.download-btn');
const qualityInput = document.querySelector('.quality input');


const loadFile = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    previeImg.src = URL.createObjectURL(file);
    previeImg.addEventListener('load', () => {
    widthInput.value = previeImg.naturalWidth;
    heightInput.value = previeImg.naturalHeight; 
    ogImageRatio = previeImg.naturalWidth / previeImg.naturalHeight;
    document.querySelector('.wrapper').classList.add('active');    
    } )

}

widthInput.addEventListener('keyup', () => {
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = height;
})

heightInput.addEventListener('keyup', () => {
    const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
})

const resizeAndDwn = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const a = document.querySelector('a');
    const imageQuality = qualityInput.checked ? 0.7 : 1.0;
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(previeImg, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL('image/jpeg', imageQuality);
    a.download = new Date().getTime();
    a.click();
}

downloadBtn.addEventListener('click', resizeAndDwn)
fileInput.addEventListener('change', loadFile);
uploadBox.addEventListener('click', () => fileInput.click());

