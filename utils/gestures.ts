import { useEffect, useState } from "react"

export type gesture_types = 'to-right' | 'to-left' | 'to-up' | 'to-down'
export interface IUseGesture{
    gesture:gesture_types
    target:TouchEvent
}
function useGesture(trigger:gesture_types[]){

    const [gesture,setGesture] = useState<IUseGesture>(null)

    let initial_touch_position_x = -1
    let initial_touch_position_y = -1

    useEffect(()=>{
        window.addEventListener('touchstart',touchStart)
        window.addEventListener('touchend', touchEnd)
        return () => {
            window.removeEventListener('touchstart',touchStart)
            window.removeEventListener('touchend',touchEnd)
        }
    },[])

    function touchStart(event:TouchEvent){
        initial_touch_position_x = event.changedTouches[0].clientX
        initial_touch_position_y = event.changedTouches[0].clientY
    }

    function touchEnd(event:TouchEvent){
        
        if(trigger.includes('to-up') || trigger.includes('to-down')){
            handleGestureOnYaxis(event)
        }
        
        if(trigger.includes('to-left') || trigger.includes('to-right')){
            handleGestureOnXaxis(event)
        }
        
        initial_touch_position_x = -1
        initial_touch_position_y = -1
    }

    function handleGestureOnXaxis(event:TouchEvent){
        if(initial_touch_position_x > -1){
            let final_touch_position_x = event.changedTouches[0].clientX
            let drag_size_x = final_touch_position_x - initial_touch_position_x  
            let abs_drag_size_x = Math.abs(drag_size_x)

            if(abs_drag_size_x>50){               
                event.stopPropagation()         
                if(drag_size_x>0){              
                    if(trigger.includes('to-left')){  
                        setGesture({
                            gesture:'to-left',
                            target:event
                        })
                    }
                }else{                
                    if(trigger.includes('to-right')){
                        setGesture({
                            gesture:'to-right',
                            target:event
                        })
                    }
                }
            }
        }
    }

    function handleGestureOnYaxis(event:TouchEvent){
        if(initial_touch_position_y > -1){
            let final_touch_position_y = event.changedTouches[0].clientY
            let drag_size_y = final_touch_position_y - initial_touch_position_y
            
            let abs_drag_size_y = Math.abs(drag_size_y)

            if(abs_drag_size_y>50){
                event.stopPropagation()         
                if(drag_size_y>0){              
                    if(trigger.includes('to-down')){
                        event.preventDefault()  
                        setGesture({
                            gesture:'to-down',
                            target:event
                        })
                    }
                }else{                
                    if(trigger.includes('to-up')){
                        setGesture({
                            gesture:'to-up',
                            target:event
                        })
                    }
                }
            }       
        }
    }

    return gesture
}


export default useGesture