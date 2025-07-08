import logo_image from '../../image/logo.png'
function Logo() {
  return (
    <div className=" shrink-0 flex items-center space-x-2 text-2xl font-bold text-blue-600">
      <img src={logo_image} alt="" className='h-10 w-10'/>
    </div>
  );
}

export default Logo;
