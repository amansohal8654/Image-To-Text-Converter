import { createWorker } from 'tesseract.js';

async function TesseractText(setPercentage, image) {
  
  const worker = createWorker({
    logger: m => {
      setPercentage(Math.floor(m.progress * 100));
    }
  });
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const result = await worker.recognize(image);
  await worker.terminate();
  return result;
}

export default TesseractText
