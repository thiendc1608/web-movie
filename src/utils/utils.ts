import { useSearchParams } from "react-router-dom"

export const useQueryString = () => {
    const [searchParams] = useSearchParams()
    const searchParamsObject = Object.fromEntries([...searchParams])
    return searchParamsObject
  }

export function _formatString(str:string) {
	// Chuyển hết sang chữ thường
	str = str.toLowerCase();     
 
	// xóa dấu
	str = str
		.normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
		.replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp
 
	// Thay ký tự đĐ
	str = str.replace(/[đĐ]/g, 'd');
	
	// Xóa ký tự đặc biệt
	str = str.replace(/([^0-9a-z-\s])/g, '');
 
	// Xóa khoảng trắng thay bằng ký tự -
	str = str.replace(/(\s+)/g, '-');
	
	// Xóa ký tự - liên tiếp
	str = str.replace(/-+/g, '-');
 
	// xóa phần dư - ở đầu & cuối
	str = str.replace(/^-+|-+$/g, '');
 
	// return
	return str;
}

export const range = (start:number, end:number) => {
	const length = end - start + 1;
	/*
		Create an array of certain length and set the elements within it from
	  start value to end value.
	*/
	return Array.from({ length }, (_, idx) => idx + start);
  };