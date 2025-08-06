import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { unslugify } from '../utils/unslugify.js'

const Breadcrumb = () => {
  const crumbs = useSelector(state => state.breadcrumb.crumbs)
  const navigate = useNavigate()

  if (!crumbs || crumbs.length === 0) return null

  const crumbsToShow = crumbs.length > 0 && (crumbs[0].label === 'Dashboard' || crumbs[0].path === '/')
    ? crumbs.slice(1)
    : crumbs;

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '1rem',
        margin: '1rem 0',
        justifyContent: 'flex-start',
      }}
    >
      <span
        style={{
          cursor: crumbsToShow.length > 0 ? 'pointer' : 'default',
          color: 'black',
          display: 'flex',
          alignItems: 'center'
        }}
        onClick={() => crumbsToShow.length > 0 && navigate('/')}
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ marginRight: 4 }}>
          <path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V10.5z" stroke="#000" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      </span>
      {crumbsToShow.length > 0 && <span style={{ color: '#bdbdbd', margin: '0 8px' }}>{'>'}</span>}
      {crumbsToShow.map((crumb, idx) => (
        <React.Fragment key={idx}>
          <span
            style={{
              cursor: idx < crumbsToShow.length - 1 ? 'pointer' : 'default',
              color: '#000',
              fontWeight: 'normal'
            }}
            onClick={() => idx < crumbsToShow.length - 1 && navigate(crumb.path)}
          >
            {unslugify(crumb.label)}
          </span>
          {idx < crumbsToShow.length - 1 && (
            <span style={{ color: '#bdbdbd', margin: '0 8px' }}>{'>'}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumb
