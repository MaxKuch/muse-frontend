import { useState } from 'react'
import DebounceSelect from '../DebounceSelect'
import { IAlbum, IOption } from '../../models/types'
import { Divider, Form,  Button, Input } from 'antd'
import axios from 'axios'
import { UploadFile } from 'antd/lib/upload/interface'
import { albumsAPI } from '../../services/albumsService'
import UploadDragger from '../UploadDragger'

interface UploadAlbumProps {
    onChange: (value: string) => void;
    next: () => void;
    artist: string;
}

interface formData {
    albumName: string;
    albumDescription: string;
    picture: UploadFile[];
}

const UploadAlbum:React.FC<UploadAlbumProps> = ({ onChange, next, artist }) => {
    const [form] = Form.useForm<formData>()
    const [value, setValue] = useState<IOption>()
    const [addAlbum, {isLoading}] = albumsAPI.useAddAlbumMutation()

    async function fetchAlbumsList(query: string) {
        return axios.get<IAlbum[]>(`${process.env.REACT_APP_SERVER_URL}/albums/artist/${artist}?query=${query}`)
            .then(({data: albums}) =>
            albums.map((album) => ({
                label: album.name,
                value: album._id
            }))
            )
    }

    const chooseAlbum = async () => { 
        if(value) {
            next()
            return
        }
        try {
            await form.validateFields()
        } catch {
            return
        }
        const formValues = form.getFieldsValue()
        const formData = new FormData()
        formData.set('artist', artist)
        formData.set('name', formValues.albumName)
        formData.set('description', formValues.albumDescription)
        formData.set('thumbnail', formValues.picture[0].originFileObj as File)
        try {
            const album = await addAlbum(formData).unwrap()
            console.log(album)
            onChange(album._id)
            next()
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <DebounceSelect 
                value={value}
                debounceTimeout={400}
                placeholder="Выберите альбом"
                fetchOptions={fetchAlbumsList}
                style={{
                    width: '100%',
                }}
                onChange={(newValue: IOption) => {
                    onChange(newValue.value)
                    setValue(newValue)
                }}
                onClear={() => setValue(undefined)}
            />
            <Divider className='divider'>Или загрузите новый</Divider>
            <Form
                form={form}
                layout='vertical'
            >
                <UploadDragger 
                    accept='image/*' 
                    disabled={!!value} 
                    label='Изображение альбома' 
                    name='picture' 
                    rules={[{required: true, message: 'Загрузите изображение альбома'}]}
                />
                <Form.Item className='form-item' rules={[{required: true, message: 'Введите название альбома'}]} name='albumName' label='Название альбома'>
                    <Input className='input' disabled={!!value}/>
                </Form.Item>
                <Form.Item className='form-item' rules={[{required: true, message: 'Введите описание альбома'}]} name='albumDescription' label='Описание альбома'>
                    <Input.TextArea className='input' rows={4} disabled={!!value}/>
                </Form.Item>
            </Form>
            <div className="d-flex justify-center">
                <Button className='button' type="primary" htmlType="button" onClick={chooseAlbum} loading={isLoading}>
                    Далее
                </Button>
            </div>
        </div>
    )
}

export default UploadAlbum