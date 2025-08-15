export const getLastSixMonths=()=>{
    const months=[];
    const today = new Date();

    for(let i=5; i >=0; i--){
        const d =new Date(today.getFullYear(), today.getMonth()-i,1);
        months.push({
            label: d.toLocaleString('default', {month:'short'}),
            monthNum: d.getMonth()+1,
            year: d.getFullYear()
        });
    }
    return months;
}