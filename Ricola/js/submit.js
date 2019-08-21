(function ($) {    
	/* =========== 選取器變數 */
	let pSend = document.querySelector('#pSend');
	let $partForm = $('#partForm');
	let partFormAllInput = document.querySelectorAll('#partForm input');

	// input
	let pNumSelector = document.querySelector('#pNum');
	let pNameSelector = document.querySelector('#pName');
	let pPhoneSelector = document.querySelector('#pPhone');
	let pEmailSelector = document.querySelector('#pEmail');
	let pAddrSelector = document.querySelector('#pAddr');

	// error span
	let NumError = document.querySelector('#NumError');
	let NameError = document.querySelector('#NameError');
	let PhoneError = document.querySelector('#PhoneError');
	let EmailError = document.querySelector('#EmailError');
	let AddrError = document.querySelector('#AddrError');
	
	/* =========== 表單驗證及送出 */
	pSend.addEventListener('click', function () {
		let notErrorCount = 0; // 沒有錯誤的話
		// 發票驗證
		if(pNumSelector.value == '') {
			NumError.innerHTML = '** 請填寫發票號碼';
			return false;
		}
		if(!(/^([A-Z]{2}[0-9]{8})/.test(pNumSelector.value.toString()))) {
			NumError.innerHTML = '** 發票格式不對';
			return false;
		} else {
			notErrorCount++;
			NumError.innerHTML = '';
		}

		// 名字驗證
		if(pNameSelector.value == '') {
			NameError.innerHTML = '** 請填寫名字';
			return false;
		} 
		if((pNameSelector.value.length < 2) || (pNameSelector.value.length > 5)) {
			NameError.innerHTML = '** 名字長度不對';
			return false;
		} else {
			notErrorCount++;
			NameError.innerHTML = '';
		}

		// 電話驗證
		if(pPhoneSelector.value == '') {
			PhoneError.innerHTML = '** 請填寫電話';
			return false;
		}
		if(pPhoneSelector.value.length !== 10) {
			PhoneError.innerHTML = '** 電話號碼長度不對';
			return false;
		} else {
			notErrorCount++;
			PhoneError.innerHTML = '';
		}

		// Email驗證
		if(pEmailSelector.value == '') {
			EmailError.innerHTML = '** 請填寫Email';
			return false;
		}
		if(pEmailSelector.value.indexOf('@') <= 0) {
			EmailError.innerHTML = '** Email 格式有誤';
			return false;
		} else {
			notErrorCount++;
			EmailError.innerHTML = '';
		}

		// 地址驗證
		if(pAddrSelector.value == '') {
			AddrError.innerHTML = '** 請填寫住址';
			return false;
		} else {
			notErrorCount++;
			AddrError.innerHTML = '';
		}

		/* =========== 如果資料都沒錯的話，抓取資料 POST 上去 */
		if(notErrorCount === 5) {
			let userDate = {
				pNum: pNumSelector.value,
				pName: pNameSelector.value,
				pPhone: pPhoneSelector.value,
				pEmail: pEmailSelector.value,
				pAddr: pAddrSelector.value,
			}
		
			// 用 post 的方式傳輸，呼叫 API
			$.post( $partForm.attr('action'), userDate, function( info ) {
				alert('謝謝您的參與');
			});

			// 傳完同時，表單都清空
			partFormAllInput.forEach(function (item, key) {
				item.value = '';
			})
		}
		
	});
})($);