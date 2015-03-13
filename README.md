# WebStorageArea

用于缓存 某个区域内的 ["input:text", "input:checkbox", "textarea", "select"],页面下次加载时,自动读取上次缓存过的值

Example
 

<script type="text/javascript">
        $(function () {
            localStorageExtension.Filter = ["joey","defalut"]; // Don't store the URL that contain the "joey" or "default"
            localStorageExtension.GetStorage(localStorageExtension.GetRoot()).call(); // get storage for the url
            $("#ctl00_ContentPlaceHolder1_shortcutButtons_ImgBtnSearch").click(function () {
                localStorageExtension.StorageArea("#searchTable").call();  // when click the search, then store 
            })
        })
    </script>
