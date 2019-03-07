import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

export const animationsConfig = [
  trigger('dropdown', [
    state(
      'yes',
      style({
        transform: 'translateY(-50px)',
        opacity: 0,
        display: 'none',
        pointerEvents: 'none'
      })
    ),
    state(
      'no',
      style({
        transform: 'translateY(0)',
        opacity: 1,
        display: 'block',
        pointerEvents: 'all'
      })
    ),
    transition(
      'no => yes',
      animate(
        150,
        keyframes([
          style({
            transform: 'translateY(0px)',
            opacity: 1,
            offset: 0,
            pointerEvents: 'none'
          }),
          style({
            transform: 'translateY(-10px)',
            opacity: 0.75,
            offset: 0.3
          }),
          style({
            transform: 'translateY(-30px)',
            opacity: 0.1,
            offset: 0.8
          }),
          style({
            transform: 'translateY(-50px)',
            opacity: 0,
            offset: 1
          })
        ])
      )
    ),
    transition(
      'yes => no',
      animate(
        150,
        keyframes([
          style({
            transform: 'translateY(-50px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateY(-30px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translateY(-10px)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translateY(0px)',
            opacity: 1,
            offset: 1,
            pointerEvents: 'all'
          })
        ])
      )
    )
  ])
]
