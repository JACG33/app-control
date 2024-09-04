import {useContext} from 'react'
import {MessageContext} from '../context/MessageProvider'

export const useMessageContext =()=> useContext(MessageContext)