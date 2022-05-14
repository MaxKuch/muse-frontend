import React from 'react'
import { ITab, ITabs } from '../../models/components'
import styles from './Tabs.module.scss'
import classnames from 'classnames'

const Tabs:React.FC<ITabs> = ({ items, onTabChange }) => {
    const tabsRef = React.useRef<HTMLUListElement>(null)
    const firstTabRef = React.useRef<HTMLLIElement>(null)

    const [currentValue, setCurrentValue] = React.useState<ITab['value']>(items[0].value)
    const [indicatorState, setIndicatorState] = React.useState({
        width: 0,
        left: 0
    })

    const itemChangeHandler = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, value: ITab['value']) => { 
        const tabEl = e.target as HTMLElement
        const tabRect = tabEl.getBoundingClientRect()
        const tabsEl = tabsRef.current as HTMLElement
        const tabsRect = tabsEl.getBoundingClientRect()
        setIndicatorState({width: tabRect.width, left: tabRect.x - tabsRect.x})
        setCurrentValue(value)
        onTabChange(value)
    }
    
    React.useEffect(() => {
        const el = firstTabRef.current as HTMLElement
        const rect = el.getBoundingClientRect()
        setIndicatorState({width: rect.width, left: 0})
    }, [])

    return (
        <> 
            <ul className={styles.tabs} ref={tabsRef}>
                {items.map((item, idx) => (
                    <li 
                        className={classnames(styles.tab, [currentValue === item.value ? styles.tabCurrent : ''])} 
                        onClick={e => itemChangeHandler(e, item.value)} 
                        key={idx}
                        ref={idx === 0 ? firstTabRef : null}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
            <div className={styles.currentIndicator}
            >
                <div 
                    style={{
                        width: `${indicatorState.width}px`,
                        left: `${indicatorState.left}px`
                    }} 
                ></div>
            </div>
        </>
    )
}

export default Tabs