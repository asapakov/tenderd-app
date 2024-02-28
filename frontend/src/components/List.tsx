import React, { useState } from 'react';
import { type IMaintenance, type IVehicle } from '../interface';
import { areAllCharsInString } from '../service/helpers';
import styles from './component.module.scss';
import Modal from './Modal';
import Form from './Form';

const List = React.memo(({ items, slug, remove, create }: any) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const [addForm, addSetForm] = useState<any>({
    modelType: '',
    type: '',
    plateNumber: '',
  });

  const deleteItem = (_id: string) => {
    const confirmed = window.confirm('Are you sure?');
    if (confirmed) {
      remove(_id, items);
    }
  };

  const getDetailedInfo = (e: any, id: string) => {
    if (e.target.tagName === 'BUTTON' || !create) return;
    window.location.href = `/maintenance/${id}`;
  };

  if (!items.length) return <div>No data provided</div>;
  return (
    <div className={styles.list}>
      <div className="d-flex justify-content-between my-3">
        <h5>{slug}</h5>
        {create && (
          <button
            onClick={() => setModalOpened(!modalOpened)}
            type="button"
            className="btn btn-success"
          >
            Add vehicle
          </button>
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            {Object.keys(items[0]).map((key: string) => {
              return (
                <th key={key} scope="col">
                  {key.toUpperCase()}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {items.map((item: IVehicle | IMaintenance) => (
            <tr onClick={(e) => getDetailedInfo(e, item._id)} key={item._id}>
              {Object.values(item).map((value: any) => (
                <td key={value} scope="row">
                  {areAllCharsInString([':', 'T', '.'], value.toString())
                    ? new Date(value).toLocaleString()
                    : value.toString().toUpperCase()}
                </td>
              ))}
              <td>
                {remove && (
                  <button
                    type="button"
                    onClick={() => deleteItem(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpened && (
        <Modal
          title={'Add new vehicle'}
          body={<Form form={addForm} setForm={addSetForm} />}
          button={'Add'}
          cb={() => create(addForm, items)}
          state={() => setModalOpened(!modalOpened)}
        />
      )}
    </div>
  );
});

List.displayName = 'ListComponent';
export default List;
