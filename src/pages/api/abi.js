// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fsPromises from 'fs/promises';
import path from 'path'


export default async function handler(
  req, res
) {
    const filePath = path.join(process.cwd(), '/src/contracts/usdcABI.json');
    const jsonData = await fsPromises.readFile( filePath, "utf8");
    const objectData = JSON.parse(jsonData);
  res.status(200).json(objectData)
}
