import pinataClient from "@pinata/sdk";
import {isNumber} from "util";

const MAX_PAGE_LIMIT = 1000;
const { PINATA_API_KEY, PINATA_API_SECRET } = process.env

//@ts-ignore
const pinata = pinataClient(PINATA_API_KEY, PINATA_API_SECRET);

const isAuth = async () => {
  const { authenticated } = await pinata.testAuthentication()
  return authenticated
}

const uploadFile = (fileName: string, filePath: string) => {


}



const getFileListBatch = async (status: string, page: number, limit: number)  => {

  const filter = {
    status: status,
    pageOffset: page,
    pageLimit: limit,
  }

  const { count: totalCount, rows } = await pinata.pinList(filter)
  const count = (rows && rows.length) || 0;

  if (totalCount === 0 || count <= 0) {
    if (totalCount === 0) {
      console.log(`Status: ${status}. Files or folder weren't found`)
    }

    return {
      files: {},
      count: count,
    }
  }

  const mapping = rows.reduce((mappings, row) => {
    const {
      ipfs_pin_hash,
      metadata
    } = row;

    const { name } = metadata

    return {
      ...mappings,
      ...{ name: ipfs_pin_hash },
    };
  }, {});
  return { mapping, count };
}

const getFileList = async (status: string, pages: number = 0, pageSize: number = 100) => {
  let page: number = 0;
  let hasMoreResults: boolean = true
  let totalFiles: number = 0;
  const files: any = []


  while(hasMoreResults) {
    let { mapping, count } = await getFileListBatch(status, page, pageSize)
    console.log(mapping, count)
    if (count === 0) {
      break;
    }

    files.push({...mapping})
    totalFiles += count
    hasMoreResults = count >= MAX_PAGE_LIMIT
  }

  return {
    files: files,
    totalFiles: totalFiles,
  }
}

export {
  isAuth,
  getFileList
}
