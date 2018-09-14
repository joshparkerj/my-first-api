const memoryStore = {
  default: null
};

function getMemoryStore(){
  return memoryStore;
}
function checkIfExists(key) {
  return !!Object.keys(memoryStore).find((memoryKey) => memoryKey === key);
}

function addToMemoryStore(key,value){
  memoryStore[key] = value;
  return null;
}
function updateMemoryStore(key,value){
  const exists = checkIfExists(key);
  if (exists) memoryStore[key] = value;
  return null;
}
function deleteFromMemoryStore(key){
  const exists = checkIfExists(key);
  if (exists) delete memoryStore[key];
  return null;
}

module.exports = {
  checkIfExists,
  addToMemoryStore,
  updateMemoryStore,
  deleteFromMemoryStore,
  getMemoryStore
}