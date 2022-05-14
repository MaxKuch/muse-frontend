import { useState } from 'react'
import DebounceSelect from '../DebounceSelect'
import { IArtist, IOption } from '../../models/types'
import { Divider, Form,  Button, Input } from 'antd'
import axios from 'axios'
import { UploadFile } from 'antd/lib/upload/interface'
import { artistsAPI } from '../../services/artistsService'
import UploadDragger from '../UploadDragger'

async function fetchArtistsList(query: string) {
    return axios.get<{artists: IArtist[]}>(`${process.env.REACT_APP_SERVER_URL}/artists?query=${query}`)
        .then(({data: {artists}}) =>
        artists.map((artist) => ({
            label: artist.name,
            value: artist._id,
        })),
        )
}

export interface UploadArtistProps {
    onChange: (value: string) => void;
    next: () => void;
}

interface formData {
    artistName: string;
    artistDescription: string;
    picture: UploadFile[]
}

const UploadArtist:React.FC<UploadArtistProps> = ({ onChange, next }) => {
    const [form] = Form.useForm<formData>()
    const [value, setValue] = useState<IOption>()
    const [addArtist, {isLoading}] = artistsAPI.useAddArtistMutation()

    const chooseArtist = async () => { 
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
        formData.set('name', formValues.artistName)
        formData.set('description', formValues.artistDescription)
        formData.set('thumbnail', formValues.picture[0].originFileObj as File)
        try {
            const artist = await addArtist(formData).unwrap()
            onChange(artist._id)
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
                placeholder="Выберите исполнителя"
                fetchOptions={fetchArtistsList}
                style={{
                    width: '100%',
                }}
                onChange={(newValue: IOption) => {
                    onChange(newValue.value)
                    setValue(newValue)
                }}
                onClear={() => setValue(undefined)}
            />
            <Divider className='divider'>Или загрузите нового</Divider>
            <Form
                form={form}
                layout='vertical'
            >
                <UploadDragger 
                    accept='image/*' 
                    disabled={!!value} 
                    label='Изображение исполнителя'
                    name='picture' 
                    rules={[{required: true, message: 'Загрузите изображение исполнителя'}]}
                />
                <Form.Item className='form-item' rules={[{required: true, message: 'Введите название исполнителя'}]} name='artistName' label='Название исполнителя'>
                    <Input className='input' disabled={!!value}/>
                </Form.Item>
                <Form.Item className='form-item' rules={[{required: true, message: 'Введите описание исполнителя'}]} name='artistDescription' label='Описание исполнителя'>
                    <Input.TextArea className='input' rows={4} disabled={!!value}/>
                </Form.Item>
            </Form>
            <div className="d-flex justify-center">
                <Button className='button' type="primary" htmlType="button" onClick={chooseArtist} loading={isLoading}>
                    Далее
                </Button>
            </div>
        </div>
    )
}

export default UploadArtist