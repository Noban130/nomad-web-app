import { Link } from 'react-router-dom'
import pin from '../../assets/imgs/pin.svg'
export default function QuestCard({
  img,
  callToActionTitle,
  callToActionUrl,
  isInList = false,
  // gonna be a quest object in the future
  header,
  id,
  title = 'title',
  businessName = 'business name',
  businessAddress = 'address',
  distance = '8 miles',
}) {
  const styles = style({ isInList })
  return (
    <div>
      <div style={styles.infoHeader}>
        <h1 style={styles.title}>
          quest #{id}: {title}
        </h1>
        <div style={styles.businessInfo}>
          <div style={styles.businessName}>
            <img src={pin} alt="Pin Icon" />
            <p>{businessName}</p>
          </div>
          <span style={styles.distance}>{distance}</span>
        </div>
      </div>
      <div style={styles.item}>
        <div style={styles.imgContainer}>
          <img style={styles.itemImg} src={img} alt="" />
        </div>
        <div style={styles.ItemContent}>
          <p style={styles.ItemContentHeader}>{header}</p>
          <Link style={styles.btn} to={callToActionUrl}>
            {callToActionTitle}
          </Link>
        </div>
      </div>
      <div style={styles.businessInfoUnder}>
        <div style={styles.businessName}>
          <img src={pin} alt="Pin Icon" />
          <div>
            <p>{businessName}</p>
            <p>{businessAddress}</p>
          </div>
        </div>
        <span style={styles.distance}>{distance}</span>
      </div>
    </div>
  )
}

const style = ({ windowWidth, DarkMode, isInList }) => {
  return {
    infoHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#fff',
    },
    title: {
      fontSize: '1.3rem',
    },
    businessInfo: {
      display: isInList ? 'flex' : 'none',
      flexDirection: 'column',
      gap: '.05rem',
    },
    businessInfoUnder: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      color: '#fff',
      display: isInList ? 'none' : 'flex',
      flexDirection: 'row',
      gap: '.05rem',
      marginTop: '.5rem',
    },
    businessName: {
      display: 'flex',
      gap: '.5rem',
    },
    distance: {
      alignSelf: 'end',
    },
    item: {
      display: 'flex',
      padding: '0 .5rem',
      maxHeight: '9rem',
      backgroundColor: '#ffffff20',
      border: '1px solid #ffffff40',
      borderRadius: '10px',
      boxShadow: '0 2px 12px #00000040',
    },
    imgContainer: {
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: '.5rem',
    },
    itemImg: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      borderRadius: '.5rem',
    },
    ItemContent: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      padding: '.5rem 0',
      justifyContent: 'space-between',
      color: '#fff',
    },
    ItemContentHeader: {
      color: '#fff',
      fontSize: '16px',
      fontFamily: "'Poppins'",
      fontWeight: 300,
      lineHeight: '21px',
      margin: '0px',
    },

    btn: {
      display: 'inline-block',
      alignSelf: 'end',
      textAlign: 'center',
      minWidth: '10rem',
      padding: '10px',
      borderRadius: '10px',
      textDecoration: 'none',
      color: '#414141',
      backgroundColor: '#EEF5CE',
      fontFamily: "'Poppins'",
      fontWeight: 700,
      boxShadow: '0 4px 12px #00000040',
    },
  }
}