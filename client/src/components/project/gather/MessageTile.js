import styles from '../../../styles/components/project/gather/Message.module.css'
import config from '../../../config.json'

export default function MessageTile({
  name,
  timeStamp,
  img,
  senderId,
  text,
  deleteMessage,
  id
}) {
  return (
    <div className={styles.container}>
      <img className={styles.profilePic} src={`${config.SERVER}/user/getImg?img_id=${img}`} alt="user" />
      <div className={styles.textContainer}>
        <div className={styles.textContainerHeader}>
          <h1>{name}</h1>
          <p>{(new Date(timeStamp)).toLocaleString()}</p>
        </div>
        <p>{text}</p>
      </div>
      <img className={styles.delete} src="/delete.svg" alt="delete" onClick={() => deleteMessage(id)} />
    </div>
  )
}
