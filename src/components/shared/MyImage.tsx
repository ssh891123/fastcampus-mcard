import { ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { getAuth, updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { useSetRecoilState } from 'recoil'

import { app, storage, store } from '@remote/firebase'
import useUser from '@hooks/auth/useUser'
import { COLLECTIONS } from '@constants'
import { userAtom } from '@atoms/user'

function MyImage({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)

  const currentUser = getAuth(app).currentUser

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files == null || user == null || currentUser == null) {
      return
    }

    const fileName = files[0].name
    const storageRef = ref(storage, `users/${user.uid}/${fileName}`)
    // firebase storage에 저장
    const uploaded = await uploadBytes(storageRef, files[0])

    // storage에서 url 가져와서 user-auth에 업데이트
    const downloadUrl = await getDownloadURL(uploaded.ref)
    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    })

    // firebase db에서 url 업데이트
    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadUrl,
    })

    setUser({
      ...user,
      photoURL: downloadUrl,
    })

    console.log('updateDoc', uploaded)
    console.log('downloadUrl', downloadUrl)
  }

  return (
    <Container>
      <img
        src={
          user?.photoURL ||
          'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-64.png'
        }
        alt="유저의 이미지"
        width={size}
        height={size}
      />
      {mode === 'upload' ? (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;

  & img {
    border-radius: 100%;
  }

  & input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

export default MyImage
