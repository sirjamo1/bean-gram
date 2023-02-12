import beanGramLogo from "../assets/images/beanGramLogo.png"
import blankAvatar from "../assets/images/blankAvatar.png"



const Navbar = () => {

 return (
     <div className="navbar-container">
         <img src={beanGramLogo} alt="Bean gram logo" width="100px" />
         <div className="user-info">
             <h3>BEAN</h3>
             <img src={blankAvatar} alt="user avatar" />
         </div>
     </div>
 );
}



export default Navbar