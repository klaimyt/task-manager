import React from 'react'
import classes from './Content.module.css'

const Content = ({children, ...rest}) => {
    return (
        <div {...rest} className={classes.content}>
            {children}
        </div>
    )
}

export default Content
