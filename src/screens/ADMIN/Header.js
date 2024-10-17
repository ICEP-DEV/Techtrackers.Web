import { Menu, User } from 'lucide-react'
//import Image from 'next/image'

export default function Header() {
  return (
    <header className="header">
      <button className="menu-button" aria-label="Open menu">
        <Menu />
      </button>
      <h1 className="admin-title">Admin</h1>
      <div className="logo">
       
      </div>
      <div className="user-profile">
        <User />
        <span>Admin</span>
      </div>
    </header>
  )
}