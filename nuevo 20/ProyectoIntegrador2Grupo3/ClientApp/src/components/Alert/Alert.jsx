import React from 'react'
import { Alert as AlertMessage } from "reactstrap"

const Alert = ({ type, message}) => <AlertMessage color={type}>{message}</AlertMessage>

export default Alert