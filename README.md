# WebStorageArea

用于缓存 某个区域内的 ["input:text", "input:checkbox", "textarea", "select"],页面下次加载时,自动读取上次缓存过的值

<h2>How to use </h2>

  ```javascript
      <script type="text/javascript">
      $(function () {
      
            localStorageExtension.GetStorage(localStorageExtension.GetRoot()).call(); // get storeage for the url
            
            $("#BtnSearch").click(function () {
                localStorageExtension.StorageArea("#searchTable").call();  // store the url
            })
            
             // Clean the inputs of search and clean the local cache data
            $("input[id=toolBtnClear]").click(function () {
                // localStorageExtension.DelStorage(key).call();
                localStorageExtension.CleanArea(".cleanSeach").call();
            });
    
        })
    </script>
   
<h2>if doesn't want to cache , do like this: add 'no_webcache' to div </h2>
  ```html
   <div id="searchTable" no_webcache>
      ...
   </div>
