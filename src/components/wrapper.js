import React, {  useState } from 'react';

import { v4 as uuid } from "uuid";
import List from '../components/List/List';
import store from '../utils/store'
import StoreApi from '../utils/storeAPI'
import InputContainer from '../components/Input/InputContainer';
import { makeStyles } from '@material-ui/core/styles'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: "100vh",
    width: '100%',
    overflowY: 'auto'
  }
}));

function Wrapper({ apiContent }) {
  const [data,setData]=useState(store)
  const classes = useStyle();


  const updateUserListsOnAPI = (body) => {
    const url = 'http://localhost:3001/api/update/' + apiContent._id;
    console.log(body);
    fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body)
    });
  }

  const addMoreCard = (content, listId) => {
    const newCard = createNewCard(content);
    const updatedList = updateListCardAndReturn(listId, newCard);
    const lists = apiContent.lists.map(list => list._id === listId ? updatedList : list);
    updateUserListsOnAPI({
      lists: lists
    });

    const newState = {
      ...apiContent,
      lists: lists
    };

    setData(newState)
  };

  const createNewCard = (content) => {
    const newCardId = uuid();
    return {
      id: newCardId,
      content: content,
    };
  }


  const createNewList = (title) => {
    const newListId = uuid();
    return {
      id: newListId,
      title,
      cards: []
    }
  }

  const updateListCardAndReturn = (listId, newCard) => {
    const updatedListCard = apiContent.lists.find(list => list._id === listId);
    updatedListCard.cards = [...updatedListCard.cards, newCard];
    return updatedListCard;
  }


  const updateListAndReturn = (newList) => {
    const updatedList = [...apiContent.lists, newList]
    return updatedList;
  }


  const addMoreList = (title) => {
    const newList = createNewList(title);
    const lists = updateListAndReturn(newList);

    updateUserListsOnAPI({
      lists: lists
    });

    const newState = {
      ...apiContent,
      lists: lists
    };
    setData(newState);
  }
  const updateListTitle = (title, listId) => {
    const updatedList = updatedTitleAndReturn(title, listId);
    const lists = apiContent.lists.map(list => list._id === listId ? updatedList : list);
    updateUserListsOnAPI({
      lists: lists
    });
    const newState = {
      ...apiContent,
      lists: lists
    };

    setData(newState)
  }
  const updatedTitleAndReturn = (newTitle, listId) => {
    const updatedList = apiContent.lists.find(list => list._id === listId);

    updatedList.title = newTitle;
    return updatedList;
  }


  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (type === "list") {
      let listIds = []
      apiContent.lists.map((list) => {
        listIds.push(list._id)
      })
      const newListIds = listIds;
      newListIds.splice(source.index, 1);
      console.log(newListIds)
      newListIds.splice(destination.index, 0, draggableId)
      console.log(newListIds)

      return;
    }
    const sourceList = apiContent.lists.find(list => list._id === source.droppableId);
    const destinationList = apiContent.lists.find(list => list._id === destination.droppableId);
    const draggingCard = sourceList.cards.filter((card) => card._id === draggableId)[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
        updateUserListsOnAPI({
         lists:
          [...apiContent.lists],
       }); 
      const newState = {
        ...apiContent,
        lists: {
          ...apiContent.lists,
          [sourceList._id]: destinationList
        }
      };
      console.log("new state1:", newState)
      setData(newState);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      //const lists = apiContent.lists.map(list => list._id === listId ? updatedList : list);

      const newState = {
        ...apiContent,
        lists: {
          ...apiContent.lists
        }
      }
      console.log("new state2:", newState)
      updateUserListsOnAPI({
        lists: 
          [...apiContent.lists]
  
      })
      setData(newState);
    }
  }

  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="app" type="list" direction="horizontal">{(provided) => (
          <div className={classes.root} ref={provided.innerRef}{...provided.droppableProps}>
            {
              apiContent.lists && apiContent.lists.map((list, index) => {
                return <List list={list} key={list._id} index={index} />
              })
            }
            <InputContainer type="list" />
            {provided.placeholder}
          </div>
        )}

        </Droppable>
      </DragDropContext>
    </StoreApi.Provider>
  );
}

export default Wrapper;
