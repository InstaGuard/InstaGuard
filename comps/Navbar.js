import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Image src="/InstaGuard_logo.png" alt="site logo" width={80} height={90} />
      </div>
    </nav>
  );
}
 
export default Navbar;