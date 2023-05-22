
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

export const Logo = ()=> {

    return (
      <div className='text-3xl text-center py-4 font-heading'>
      <Link href="/post"> Content Writer
        <FontAwesomeIcon icon={faBlog} className= "text-2xl text-slate-400 pl-2" />
  </Link>     </div >
    )
  }
