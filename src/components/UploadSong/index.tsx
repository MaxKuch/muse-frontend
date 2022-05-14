import {  Form,  Button, Input } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import { songsAPI } from '../../services/songsService'
import UploadDragger from '../UploadDragger'

export interface UploadSongProps {
    next: () => void;
    artist: string;
    album: string;
}

interface formData {
    songName: string;
    songDescription: string;
    thumbnail: UploadFile[];
    audio: UploadFile[];
}

const UploadSong:React.FC<UploadSongProps> = ({ next, artist, album }) => {
    const [form] = Form.useForm<formData>()
    const [addSong, {isLoading}] = songsAPI.useAddSongMutation()

    const uploadSong = async () => { 
        try {
            await form.validateFields()
        } catch {
            return
        }
        const formValues = form.getFieldsValue()
        const formData = new FormData()
        console.log(album)
        formData.set('album', album)
        formData.set('artist', artist)
        formData.set('name', formValues.songName)
        formData.set('description', formValues.songDescription)
        if(formValues.thumbnail) formData.set('thumbnail', formValues.thumbnail[0].originFileObj as File)
        formData.set('audio', formValues.audio[0].originFileObj as File)
        try {
            await addSong(formData).unwrap()
            next()
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Form
                form={form}
                layout='vertical'
            >
                <UploadDragger 
                    accept='image/*' 
                    label='Изображение песни' 
                    name='thumbnail' 
                />
                <UploadDragger 
                    accept='audio/*' 
                    label='Загрузите песню' 
                    name='audio' 
                    rules={[{required: true, message: 'Загрузите песню'}]}
                />
                <Form.Item className='form-item' rules={[{required: true, message: 'Введите название песни'}]} name='songName' label='Название песни'>
                    <Input className='input'/>
                </Form.Item>
            </Form>
            <div className="d-flex justify-center">
                <Button className='button' type="primary" htmlType="button" onClick={uploadSong} loading={isLoading}>
                    Добавить
                </Button>
            </div>
        </div>
    )
}

export default UploadSong