
  

    export const getLastMessageTime = ({ time, showYear = false }) => {
      console.log("time", time);
      
  
      const timestamp = isNaN(time) ? Date.parse(time) : parseInt(time);
      const sent = new Date(timestamp);
      const now = new Date();
    
      if (
        now.getDate() === sent.getDate() &&
        now.getMonth() === sent.getMonth() &&
        now.getFullYear() === sent.getFullYear()
      ) {
        return sent.toLocaleTimeString();
      }
      
      return showYear
        ? `${sent.getDate()} ${_getMonth(sent)} ${sent.getFullYear()}`
        : `${sent.getDate()} ${_getMonth(sent)}`;
    };
  
   
  
    export const getMessageTime = ({ time }) => {
      const sent = new Date(parseInt(time));
      const now = new Date();
  
      const formattedTime = sent.toLocaleTimeString();
      if (
        now.getDate() === sent.getDate() &&
        now.getMonth() === sent.getMonth() &&
        now.getFullYear() === sent.getFullYear()
      ) {
        return formattedTime;
      }
  
      return now.getFullYear() === sent.getFullYear()
        ? `${formattedTime} - ${sent.getDate()} ${_getMonth(sent)}`
        : `${formattedTime} - ${sent.getDate()} ${_getMonth(sent)} ${sent.getFullYear()}`;
    }
  
    const _getMonth = (date) => {
      console.log(date);
      switch (date.getMonth() + 1) {
        case 1:
          return 'Tháng 1';
        case 2:
          return 'Tháng 2';
        case 3:
          return 'Tháng 3';
        case 4:
          return 'Tháng 4';
        case 5:
          return 'Tháng 5';
        case 6:
          return 'Tháng 6';
        case 7:
          return 'Tháng 7';
        case 8:
          return 'Tháng 8';
        case 9:
          return 'Tháng 9';
        case 10:
          return 'Tháng 10';
        case 11:
          return 'Tháng 11';
        case 12:
          return 'Tháng 12';
      }
      return 'NA';
    }
  
  
  