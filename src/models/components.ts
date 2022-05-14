import { IAudio, IOption } from './types'
import { SelectProps } from 'antd/lib/select/index.d'

export interface ITab {
    value: string;
    text: string;
}

export interface ITabs {
    items: ITab[];
    onTabChange: (a: ITab['value']) => void;
}

export interface IPlayButton {
    playing: boolean;
    extraClasses?: string[];
    onClick?: () => void
}

export interface IAudioItem {
    song: IAudio;
    onPlay?: () => void;
}

export interface IAddToFavorites {
    song: IAudio;
}

export interface ICard {
    size: 'small' | 'large';
    title?: string;
    subtitle?: string;
    image: string;
}

export interface IDebounceSelect extends SelectProps {
    debounceTimeout: number;
    fetchOptions: (a: string) => Promise<IOption[]>
}