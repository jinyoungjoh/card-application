import useUser from '@/hooks/auth/useUser'
import { app, storage, store } from '@/remote/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import styled from '@emotion/styled'
import { getAuth, updateProfile } from 'firebase/auth'
import { ChangeEvent } from 'react'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@/constants'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@/atom/user'
import { colors } from '@/styles/colorPalette'

function ProfileImage({
  size = 40,
  mode = 'default',
}: {
  size?: number
  mode?: 'default' | 'upload'
}) {
  const user = useUser()
  const setUser = useSetRecoilState(userAtom)

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    const currentUser = getAuth(app).currentUser

    if (files == null || user == null || currentUser == null) {
      return
    }

    const fileName = files[0].name
    const storageRef = ref(storage, `user/${user.uid}/profile/${fileName}`)
    const uploaded = await uploadBytes(storageRef, files[0])
    const downloadUrl = await getDownloadURL(uploaded.ref)

    await updateProfile(currentUser, {
      photoURL: downloadUrl,
    })

    await updateDoc(doc(collection(store, COLLECTIONS.USER), currentUser.uid), {
      photoURL: downloadUrl,
    })

    setUser({
      ...user,
      profileImageURL: downloadUrl,
    })
  }

  return (
    <Container>
      <img
        src={
          user?.profileImageURL ||
          'https://cdn0.iconfinder.com/data/icons/user-pictures/100/unknown_1-2-1024.png'
        }
        alt="사용자 프로필 이미지"
        width={size}
        height={size}
        style={{ border: `1px solid ${colors.grey}` }}
      />
      {mode === 'upload' && (
        <input type="file" accept="image/*" onChange={handleUploadImage} />
      )}
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

export default ProfileImage
