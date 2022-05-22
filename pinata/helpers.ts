
const getFileName = (filePath: string) => (filePath && filePath.replace(/^.*[\\/]/, '')) || '';

const PinataStatus = {
  ALL: 'all',
  PINNED: 'pinned',
  UNPINNED: 'unpinned',
};

export {
  getFileName,
  PinataStatus
}

