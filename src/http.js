//Easy HTTP library with FETCH API
//with ES6 Classes, ES7 Await&Async

//Await ile bu fonksiyonun bir promise yapıda olduğu dolayısıyla bir resolve ya da reject olayına sahip olduğunu belirtiyoruz. 
//Eğer fetch adlı fonksiyon resolve olursa resolve ile döndürülen şey response değişkeninin içinde yer almış oluyor.

class EasyHTTP{
    
    //Make an HTTP GET Request
    //get metodu promise yapıda olduğu için return edilen değerle ilgili mutlaka olumlu(resolved) ya da olumsuz(reject) yanıt verilir.
    async get(url){

        //await promise yapıda
        //fetch'in yanıtı resolved olursa, döndürülen değer response'a atanır.
        const response= await fetch(url);
        //Eğer response json tipinde döndürülürse(resolved) sonucu data'ya aktar.
        const resData= await response.json();

        return resData;
    }
 
    //Make an HTTP POST Request
    async post(url,data){

        const response= await fetch(url,{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(data)//Data gönderilirken JSON formatında gönderilir.

        });
        const resData=await response.json();
        return resData;
    } 

    //Make an HTTP PUT Request
     async put(url,data){
         const response=await fetch(url,{
             method:'PUT',
             headers:{'Content-type':'application/json'},
             body:JSON.stringify(data)
         });

         const resData=await response.json();
         return resData;
     }

     //Make an HTTP DELETE Request
     async delete(url){

         const response=await fetch(url,{
             method:'DELETE',
             headers:{'Content-type':'application/json'}
         });
         const resData = await 'Resource deleted...';
         
         return resData;
     }


}

export const http=new EasyHTTP(); //Oluşturulan yeni http objesini dışarı aktardık.


//if:resolve , hata yoksa then ile cevap yakalanır ve hata olmadığı duruma göre işlemlere devam edilir.
//else:reject , hata varsa catch ile cevap yakalanır ve hata olduğu duruma göre işlemlere devam edilir.
