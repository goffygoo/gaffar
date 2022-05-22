import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import Task from "./board/Task";
import styles from '../../styles/components/project/Board.module.css'

import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionTest from '../../action/actionBoard'
import { useSelector } from 'react-redux'
import AddTask from "./board/AddTask";

export default function Board() {
  const dispatch = useDispatch()
  const { setColumns, addCol, delCol, addTask } = bindActionCreators(actionTest, dispatch)
  const { columns } = useSelector(state => state.board)

  const [popupCol, setpopupCol] = useState(false)
  const [col, setcol] = useState('')
  const [popupAddTask, setpopupAddTask] = useState(false)
  const [popupTask, setpopupTask] = useState(false)
  const [task, settask] = useState('')

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  return (
    <>
      {popupCol !== false ?
        <div className={styles.containerPopup}>
          <div className={styles.popup}>
            <img src="/cancelButton.svg" alt='cancel' onClick={() => setpopupCol(false)} />
            <h1>Add Column</h1>

            <input value={col} onChange={e => setcol(e.target.value)} />
            <button onClick={() => {
              addCol(popupCol, col)
              setcol('')
              setpopupCol(false)
            }}>Add</button>
          </div>
        </div>
        : null
      }

      {popupAddTask ? <AddTask view={setpopupAddTask} addTask={addTask} /> : null}

      {popupTask ? <Task view={setpopupTask} /> : null}

      <div className={styles.container}>
        <button onClick={() => setpopupAddTask(true)}>+</button>

        {columns ? <DragDropContext
          onDragEnd={result => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).sort((a, b) => a[1].index - b[1].index).map(([columnId, column]) => {
            return (
              <div
                className={styles.column}
                key={columnId}
              >
                <div className={styles.columnHead}>
                  <h2>{column.name}</h2>
                  {columnId !== "Done" ? <button className={styles.addBtn} onClick={() => setpopupCol(columnId)}>+</button> : null}
                  {columnId !== "Done" && columnId !== "To do" ? <button className={styles.removeBtn} onClick={() => delCol(columnId)}>-</button> : null}
                </div>

                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={styles.columnMain}
                        style={{
                          ...(snapshot.isDraggingOver && {background: "yellow"})
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={styles.taskTile}
                                    style={{
                                      ...(snapshot.isDragging && {background: "hotpink"}),
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <p>{item.content}</p>
                                    <img src="/eye.png" alt='view' onClick={() => setpopupTask(true)}/>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext> : null}
      </div>
    </>
  );
}