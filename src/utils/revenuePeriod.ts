export interface PayrollPeriod {
  from: string;
  to: string;
  label: string;
}


/**
 * Lấy kỳ lương theo quy tắc:
 *
 * Kỳ lương tháng N:
 * Từ ngày 21 tháng N-2
 * Đến ngày 20 tháng N-1
 *
 * Ví dụ:
 * Tháng 8/2026:
 * 21/06/2026 - 20/07/2026
 */
export const getPayrollPeriod = (
  month: number,
  year: number
): PayrollPeriod => {


  let startMonth = month - 2;

  let startYear = year;


  let endMonth = month - 1;

  let endYear = year;



  // xử lý tháng đầu năm

  if (startMonth <= 0) {

    startMonth += 12;

    startYear--;

  }



  if (endMonth <= 0) {

    endMonth += 12;

    endYear--;

  }



  const from =
    `${startYear}-${String(startMonth).padStart(2,"0")}-21`;



  const to =
    `${endYear}-${String(endMonth).padStart(2,"0")}-20`;



  const label =
    `21/${String(startMonth).padStart(2,"0")}/${startYear}`
    +
    " - "
    +
    `20/${String(endMonth).padStart(2,"0")}/${endYear}`;



  return {
    from,
    to,
    label,
  };

};



/**
 * Lấy danh sách 12 kỳ lương để render select
 */
export const getPayrollMonths = (
  year:number
)=>{

 return Array.from(
  {length:12},
  (_,index)=>{

    const month=index+1;


    return {

      month,

      ...getPayrollPeriod(
        month,
        year
      )

    };

  }
 );

};