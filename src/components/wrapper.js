import React, { useEffect, useState } from 'react';

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

  const [data, setData] = useState(store);
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
  const updatedTitleAndReturn = (newTitle,listId) => {
    const updatedList = apiContent.lists.find(list => list._id === listId);

    updatedList.title = newTitle;
    return updatedList;
  }
  /*  const updateListTitle = (title,listId) => {
 
     const list = apiContent.lists;
     console.log(list)
     list.title = title;
 
     const newState = {
       ...apiContent,
       lists: {
         ...apiContent.lists,
         [listId]: list
       }
     }
     setData(newState);
   }; */



  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (type === "list") {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId)
      return;
    }
    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter((card) => card.id === draggableId)[0];
    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList
        }
      };
      setData(newState);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList
        }
      }
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
