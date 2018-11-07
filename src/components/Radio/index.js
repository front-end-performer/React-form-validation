import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import '../Radio/styles.css'

const renderText = (props) => {
  const {
    subtitle,
    title
  } = props

  return subtitle
    ? (
      <div className={classnames('textContainer', subtitle && 'containerWithSubtitle')}>
        <div className='title'>{title}</div>
        <div className='subtitle'>{subtitle}</div>
      </div>
    )
    : <div className='textContainer'>{title}</div>
}

const renderLogos = (images) => {
  return (
    <div className='imagesContainer'>
      {images.map((image, index) => {
        return (
          <img
            key={index}
            src={image}
            alt=''
            className='image'
          />
        )
      })}
    </div>
  )
}

const Radio = (props) => (
  <div
    className={classnames('container',
      props.displayBorder && 'border',
      props.fullWidth && 'fullWidth',
      props.displayBorder && props.active && 'active',
      props.lightBorder && 'lightBorder',
      props.fullBorder && 'fullBorder'
    )}
    onClick={props.onClick}
  >
    <div className='contentContainer'>
      <div className='radioButton'>
        <input type='radio' id='select' onChange={() => { }} checked={props.active} />
        <label htmlFor='select' className='label'>
          <div className='circle'></div>
        </label>
      </div>
      {renderText(props)}
    </div>
    {props.images && renderLogos(props.images)}
  </div>
)

Radio.defaultProps = {
  active: false,
  onClick: () => { /* do nothing */ },
  title: 'Option'
}

Radio.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  displayBorder: PropTypes.bool,
  fullWidth: PropTypes.bool,
  lightBorder: PropTypes.bool,
  images: PropTypes.array,
  fullBorder: PropTypes.bool
}

renderText.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
}

export default Radio
