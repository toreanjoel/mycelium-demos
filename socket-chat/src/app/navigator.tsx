'use server'
import { redirect } from 'next/navigation'
 
// navigate to a specific room
function room_navigate(room_id: string) {
  redirect(`/room/${room_id}`)
}

// navigate to a specific room
function lobby_navigate() {
  redirect("/")
}

export {
  lobby_navigate,
  room_navigate
}