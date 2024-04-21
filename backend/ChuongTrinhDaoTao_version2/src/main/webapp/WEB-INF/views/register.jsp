<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8">
<title>Đăng ký</title>
</head>
<link
	href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
	rel="stylesheet" id="bootstrap-css">
<script
	src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script> 
<script
	src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> 
<link href="./css/dangky.css" rel="stylesheet">

<body class="bg-dark">
    <div class="header">
        <nav class="navbar navbar-expand-lg navbar-light bg-white p-0">
            <div class="container-fluid">
                <a class="navbar-brand p-0" href="#"><img class="height-header img-fluid" src="./assets/img/logo/sdasd40.png"
                        alt="no-logo" class=""></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
                        <li class="nav-item">
                            <a class="m-0 nav-link active fw-normal text-secondary h5 px-3" aria-current="page" href="#">TRANG CHỦ</a>
                        </li>
                        <li class="nav-item">
                            <a class="m-0 nav-link fw-normal text-secondary h5 px-3" href="#">LỊCH CHIẾU</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fw-normal text-secondary h5 px-3 m-0" href="#">LIÊN HỆ</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="m-0 nav-link dropdown-toggle fw-normal text-secondary h5 px-3" href="#"
                                id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                PHIM
                            </a>
                            <ul class="dropdown-menu m-0 p-0 shadow-sm" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Phim đang chiếu</a></li>
                                <li><a class="dropdown-item" href="#">Phim sắp chiếu</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
    <div class="content-register" >
        <div class="row">
            <div class="col-md-4">
            </div>
            <div class="col-md-4 frm-register mt-5">
                <div class="frm-register-header row text-center mt-4 justify-content-center" id="buttonRow">
                    <button class="col-md-5 bg-white"  > <a href="logIn.html">Đăng nhập</a></button>
                    <button class="col-md-5 bg-white highlight"><a href="register.html">Đăng ký</a></button>
                </div>
                <c:if test="${not empty message}">
					<div style="color: red" class="alert alert-${alert}">${message}</div>
				</c:if>
                <form action="<c:url value='/dangki'/>" class="mt-4" method="post">
                    <div class="frm-register-content row justify-content-center">
                        <div class="col-md-10">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" name="fullName" id="fullName" placeholder="">
                                <label for="fullName">Họ và tên (*)</label>
                            </div>
                        </div>
                        <c:if test="${not empty message_fullName}">
							<div style="color: red" class="alert alert-${alert}">${message_fullName}</div>
						</c:if>
                        <div class="col-md-10">
                            <div class="form-floating mb-3">
                                <input type="date" class="form-control" name="dateView" id="dob">
                                <label for="dob">Ngày sinh</label>
                            </div>
                        </div> 
                        <c:if test="${not empty message_dateOfBirth}">
							<div style="color: red" class="alert alert-${alert}">${message_dateOfBirth}</div>
						</c:if>
                        <div class="col-md-10">
                            <div class="form-floating mb-3">
                                <input type="tel" class="form-control"  name="phone" placeholder=" ">
                                <label for="phone">Số điện thoại</label>
                            </div>
                        </div>
                         <c:if test="${not empty mess_phone}">
							<div style="color: red" class="alert alert-${alert}">${mess_phone}</div>
						</c:if>
                        <div class="col-md-10">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" name="address" placeholder=" ">
                                <label for="address">Địa chỉ</label>
                            </div>
                           
                        </div>
                         <c:if test="${not empty message_address}">
							<div style="color: red" class="alert alert-${alert}">${message_address}</div>
						</c:if>
                        <div class="col-md-10">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" name="email" placeholder=" ">
                                <label for="email">Email (*)</label>
                            </div>
                           
                        </div>
                         <c:if test="${not empty message_email}">
								<div style="color: red" class="alert alert-${alert}">${message_email}</div>
						</c:if>
                        <div class="col-md-10">
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" name="password" placeholder=" ">
                                <label for="password">Mật khẩu (*)</label>
                            </div>
                            
                        </div>
                        <c:if test="${not empty message_password}">
							<div style="color: red" class="alert alert-${alert}">${message_password}</div>
						</c:if>
                        <div class="col-md-10">
                            <div class="form-floating mb-3">
                                <input type="password" class="form-control" name="repeat_password" placeholder=" ">
                                <label for="password">Nhập lại mật khẩu (*)</label>
                            </div>
                        </div>
                        <c:if test="${not empty message_repeat_password}">
							<div style="color: red" class="alert alert-${alert}">${message_repeat_password}</div>
						</c:if>
                        <div class="frm-register-footer col-md-12 text-center">
                            <p>Bạn đã có tài khoản? <a href="#" class="text-primary text-decoration-none">Đăng nhập</a></p>
                            <button style="color: red" type="submit" class="btn mb-2">Đăng ký</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-4">
            </div>
        </div>
    </div>
    <div class="bg-image bg-image-footer p-0 m-0 w-100 pt-1">
        <!-- Footer -->
        <footer class="text-center text-lg-start text-white">
            <div class="container text-center text-md-start mt-5 p-0">
                <!-- Grid row -->
                <div class="row">
                    <!-- Grid column -->
                    <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">
                        <!-- Content -->
                        <div class="img-fluid mb-3"><img class="logo-footer" src="./assets/img/logo/logo-footer.png" alt="no-logo"></div>
                        
                        <p>Support: <a class="text-white" href="#">Support@Starlight.Vn</a></p>
                        <p>Hotline: 19001722</p>
                        <svg fill="#fff" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35px" height="35px" viewBox="-102.4 -102.4 716.80 716.80" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="7935ec95c421cee6d86eb22ecd11b7e3"> <path style="display: inline;" d="M283.122,122.174c0,5.24,0,22.319,0,46.583h83.424l-9.045,74.367h-74.379 c0,114.688,0,268.375,0,268.375h-98.726c0,0,0-151.653,0-268.375h-51.443v-74.367h51.443c0-29.492,0-50.463,0-56.302 c0-27.82-2.096-41.02,9.725-62.578C205.948,28.32,239.308-0.174,297.007,0.512c57.713,0.711,82.04,6.263,82.04,6.263 l-12.501,79.257c0,0-36.853-9.731-54.942-6.263C293.539,83.238,283.122,94.366,283.122,122.174z"> </path> </g> </g></svg>
<svg width="64px" height="64px" viewBox="-5 -5 35.00 35.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.78353 7.74971C10.1976 7.73814 10.5239 7.39311 10.5123 6.97906C10.5007 6.565 10.1557 6.23873 9.74164 6.25029L9.78353 7.74971ZM5.50158 11.5L6.25132 11.52C6.25167 11.5067 6.25167 11.4933 6.25132 11.48L5.50158 11.5ZM9.76258 16L9.74164 16.7497C9.7556 16.7501 9.76957 16.7501 9.78353 16.7497L9.76258 16ZM14.0236 11.5L14.7733 11.48C14.7625 11.0737 14.43 10.75 14.0236 10.75V11.5ZM9.76258 10.75C9.34837 10.75 9.01258 11.0858 9.01258 11.5C9.01258 11.9142 9.34837 12.25 9.76258 12.25V10.75ZM19.3276 9.679C19.7418 9.679 20.0776 9.34321 20.0776 8.929C20.0776 8.51479 19.7418 8.179 19.3276 8.179V9.679ZM17.5016 8.179C17.0874 8.179 16.7516 8.51479 16.7516 8.929C16.7516 9.34321 17.0874 9.679 17.5016 9.679V8.179ZM17.5016 9.679C17.9158 9.679 18.2516 9.34321 18.2516 8.929C18.2516 8.51479 17.9158 8.179 17.5016 8.179V9.679ZM15.6756 8.179C15.2614 8.179 14.9256 8.51479 14.9256 8.929C14.9256 9.34321 15.2614 9.679 15.6756 9.679V8.179ZM16.7516 8.929C16.7516 9.34321 17.0874 9.679 17.5016 9.679C17.9158 9.679 18.2516 9.34321 18.2516 8.929H16.7516ZM18.2516 7C18.2516 6.58579 17.9158 6.25 17.5016 6.25C17.0874 6.25 16.7516 6.58579 16.7516 7H18.2516ZM18.2516 8.929C18.2516 8.51479 17.9158 8.179 17.5016 8.179C17.0874 8.179 16.7516 8.51479 16.7516 8.929H18.2516ZM16.7516 10.857C16.7516 11.2712 17.0874 11.607 17.5016 11.607C17.9158 11.607 18.2516 11.2712 18.2516 10.857H16.7516ZM9.74164 6.25029C6.90939 6.32941 4.67644 8.68761 4.75185 11.52L6.25132 11.48C6.19794 9.47505 7.77861 7.80571 9.78353 7.74971L9.74164 6.25029ZM4.75185 11.48C4.67644 14.3124 6.90939 16.6706 9.74164 16.7497L9.78353 15.2503C7.77861 15.1943 6.19794 13.5249 6.25132 11.52L4.75185 11.48ZM9.78353 16.7497C12.6158 16.6706 14.8487 14.3124 14.7733 11.48L13.2738 11.52C13.3272 13.5249 11.7466 15.1943 9.74164 15.2503L9.78353 16.7497ZM14.0236 10.75H9.76258V12.25H14.0236V10.75ZM19.3276 8.179H17.5016V9.679H19.3276V8.179ZM17.5016 8.179H15.6756V9.679H17.5016V8.179ZM18.2516 8.929V7H16.7516V8.929H18.2516ZM16.7516 8.929V10.857H18.2516V8.929H16.7516Z" fill="#fff"></path> </g></svg>
<svg width="40px" height="40px" viewBox="-4 -4 28.00 28.00" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>twitter [#154]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-60.000000, -7521.000000)" fill="#fff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705" id="twitter-[#154]"> </path> </g> </g> </g> </g></svg>
<svg width="40px" height="40px" viewBox="-4.08 -4.08 32.16 32.16" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.06167 7.24464C3.10844 6.22264 3.26846 5.56351 3.48487 5.00402L3.48778 4.99629C3.70223 4.42695 4.03818 3.91119 4.47224 3.48489L4.47833 3.47891L4.48431 3.47282C4.91096 3.0382 5.42691 2.70258 5.99575 2.4887L6.00556 2.48495C6.56378 2.26786 7.22162 2.10843 8.24447 2.06167M3.06167 7.24464C3.0125 8.33659 2.99997 8.67508 2.99997 11.5063C2.99997 14.3381 3.01181 14.6758 3.06164 15.768M3.06167 7.24464L3.06167 7.52008M3.48867 18.0168C3.70255 18.5856 4.03817 19.1015 4.47279 19.5282L4.47887 19.5342L4.48484 19.5402C4.91116 19.9743 5.42694 20.3103 5.99628 20.5247L6.00478 20.5279C6.56351 20.7446 7.22167 20.9041 8.24447 20.9509M3.48867 18.0168L3.48492 18.0069C3.26783 17.4487 3.1084 16.7909 3.06164 15.768M3.48867 18.0168L3.47585 17.9492M3.06164 15.768L3.07839 15.8562M3.06164 15.768L3.06164 15.4919M3.47585 17.9492L3.07839 15.8562M3.47585 17.9492C3.30704 17.5033 3.13322 16.881 3.07839 15.8562M3.47585 17.9492C3.48177 17.9649 3.48768 17.9803 3.49359 17.9955C3.70766 18.5726 4.04685 19.0952 4.48679 19.5256C4.91708 19.9655 5.43944 20.3046 6.01636 20.5187C6.47934 20.699 7.13172 20.8875 8.24431 20.9385C9.3671 20.9896 9.71399 21 12.5062 21C15.2985 21 15.6457 20.9896 16.7685 20.9385C17.8824 20.8874 18.534 20.6979 18.9954 20.519C19.5726 20.305 20.0953 19.9657 20.5257 19.5256C20.9655 19.0953 21.3046 18.573 21.5187 17.9961C21.699 17.5331 21.8875 16.8808 21.9384 15.7682C21.9895 14.6454 22 14.2978 22 11.5063C22 8.71472 21.9895 8.36684 21.9384 7.24405C21.8871 6.12427 21.6959 5.47168 21.5161 5.00992C21.2811 4.40322 20.9831 3.94437 20.525 3.48627C20.0678 3.02999 19.6102 2.73179 19.003 2.49654C18.5396 2.31537 17.8866 2.12531 16.7685 2.07406C16.6712 2.06964 16.5798 2.06552 16.4921 2.06168M3.07839 15.8562C3.07684 15.8273 3.07539 15.7981 3.07403 15.7685C3.06961 15.6712 3.06548 15.5797 3.06164 15.4919M8.24447 2.06167C9.33668 2.01184 9.67505 2 12.5062 2C15.3374 2 15.6756 2.01252 16.7675 2.06168M8.24447 2.06167L8.52062 2.06167M16.7675 2.06168L16.4921 2.06168M16.7675 2.06168C17.7897 2.10844 18.4489 2.26844 19.0085 2.48487L19.0162 2.48781C19.5855 2.70226 20.1013 3.03821 20.5276 3.47227L20.5335 3.4783L20.5396 3.48422C20.9737 3.91055 21.3096 4.42646 21.5239 4.99596L21.5275 5.00559C21.7446 5.56381 21.9041 6.22165 21.9508 7.2445M8.52062 2.06167L16.4921 2.06168M8.52062 2.06167C9.44548 2.02123 9.95666 2.01253 12.5062 2.01253C15.056 2.01253 15.5671 2.02124 16.4921 2.06168M8.52062 2.06167C8.43284 2.06551 8.34134 2.06964 8.24402 2.07406C7.13004 2.12512 6.47843 2.31464 6.01708 2.49358C5.43767 2.70837 4.91328 3.04936 4.48192 3.49186C4.0281 3.94756 3.73105 4.40422 3.49655 5.0094C3.31536 5.4728 3.12527 6.12614 3.07402 7.24434C3.06961 7.34135 3.06549 7.43257 3.06167 7.52008M21.9508
15.768C21.9041 16.7908 21.7446 17.449 21.5279 18.0077L21.5247 18.0162C21.3102 18.5856 20.9743 19.1013 20.5402 19.5276L20.5341 19.5336L20.5282 19.5397C20.1015 19.9743 19.5856 20.3099 19.0167 20.5238L19.0069 20.5276C18.4487 20.7447 17.7908 20.9041 16.768 20.9509M3.06164 15.4919C3.0212 14.567 3.0125 14.0558 3.0125 11.5063C3.0125 8.95591 3.0212 8.44544 3.06167 7.52008M3.06164 15.4919L3.06167 7.52008M10.8155 15.5881C11.3515 15.8101 11.926 15.9244 12.5062 15.9244C13.678 15.9244 14.8018 15.4589 15.6304 14.6304C16.4589 13.8018 16.9244 12.678 16.9244 11.5063C16.9244 10.3345 16.4589 9.21072 15.6304 8.38215C14.8018 7.55359 13.678 7.0881 12.5062 7.0881C11.926 7.0881 11.3515 7.20238 10.8155 7.42442C10.2794 7.64645 9.79239 7.97189 9.38213 8.38215C8.97187 8.79242 8.64643 9.27947 8.42439 9.81551C8.20236 10.3515 8.08808 10.9261 8.08808 11.5063C8.08808 12.0865 8.20236 12.661 8.42439 13.197C8.64643 13.7331 8.97187 14.2201 9.38213 14.6304C9.79239 15.0406 10.2794 15.3661 10.8155 15.5881ZM9.37229 8.37231C10.2035 7.54113 11.3308 7.07418 12.5062 7.07418C13.6817 7.07418 14.809 7.54113 15.6402 8.37231C16.4714 9.20349 16.9383 10.3308 16.9383 11.5063C16.9383 12.6817 16.4714 13.809 15.6402 14.6402C14.809 15.4714 13.6817 15.9383 12.5062 15.9383C11.3308 15.9383 10.2035 15.4714 9.37229 14.6402C8.54111 13.809 8.07416 12.6817 8.07416 11.5063C8.07416 10.3308 8.54111 9.20349 9.37229 8.37231ZM19.434 6.04229C19.434 6.37873 19.3003 6.70139 19.0625 6.93929C18.8246 7.17719 18.5019 7.31084 18.1655 7.31084C17.829 7.31084 17.5064 7.17719 17.2685 6.93929C17.0306 6.70139 16.8969 6.37873 16.8969 6.04229C16.8969 5.70585 17.0306 5.38319 17.2685 5.1453C17.5064 4.9074 17.829 4.77375 18.1655 4.77375C18.5019 4.77375 18.8246 4.9074 19.0625 5.1453C19.3003 5.38319 19.434 5.70585 19.434 6.04229Z" stroke="#fff" stroke-linejoin="round"></path> </g></svg>

                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">
                        <!-- Links -->
                        <p class="text-uppercase mb-3 fw-normal text-color-main-100 footer-title">CHÍNH SÁCH</p>
                        <p><a href="#" class="text-white text-decoration-none">>>Điều khoản chung</a></p>
                        <p><a href="#" class="text-white text-decoration-none">>>Chính sách thanh toán</a></p>
                        <p><a href="#" class="text-white text-decoration-none">>>Chính sách bảo mật</a></p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
                        <!-- Links -->
                        <p class="text-uppercase mb-3 fw-normal text-color-main-100 footer-title">DOWNLOAD APPS</p>
                        <p>Tải ngay ứng dụng  đặt vé online cho Dế yêu của bạn!</p>
                        <div class="img-fluid mb-4"><img class="logo-footer-200" src="./assets/img/logo/google-play.png" alt="no-logo"></div>
                        <div class="img-fluid mb-5"><img class="logo-footer-200" src="./assets/img/logo/logo-appstore.png" alt="no-logo"></div>
                    </div>
                    <!-- Grid column -->
                </div>
                <!-- Grid row -->
            </div>
    
            <!-- Copyright -->
            <div class="text-center p-3 border-top border-secondary">
                2024 © StarLight. All Rights Reserved - Design By <p class="text-color-main-100 d-inline fw-bold">PVDuyen</p>
            </div>
            <!-- Copyright -->
        </footer>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
</body>

</html>