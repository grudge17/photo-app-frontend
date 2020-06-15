
export const handleOpen=(store)=>{
    const open = !store.state.open
  
    store.setState({open})
}
export const handleItemId=(store,itemId1)=>{
    var itemId=store.state.itemId
    itemId = itemId1
    store.setState({itemId})
}
