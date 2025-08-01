// 加载并解析导航数据
function loadNavigationData(callback) {
    var xhr = null;
    // 兼容旧版浏览器的XMLHttpRequest创建方式
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP"); // 兼容IE旧版本
    }
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    callback(data);
                } catch (e) {
                    alert('数据解析错误: ' + e.message);
                }
            } else {
                alert('无法加载导航数据，请检查文件是否存在');
            }
        }
    };
    
    xhr.open('GET', '/ADN/sites.json', true);
    xhr.send();
}

// 生成导航内容
function generateNavigationContent(data) {
    var container = document.getElementById('nav-container');
    if (!container) return;
    
    // 遍历所有类别
    for (var i = 0; i < data.categories.length; i++) {
        var category = data.categories[i];
        
        // 创建类别标题
        var categoryTitle = document.createElement('h2');
        categoryTitle.className = 'category-title';
        categoryTitle.textContent = category.name;
        container.appendChild(categoryTitle);
        
        // 创建链接列表容器
        var linkList = document.createElement('div');
        linkList.className = 'link-list';
        container.appendChild(linkList);
        
        // 遍历类别下的所有站点
        for (var j = 0; j < category.sites.length; j++) {
            var site = category.sites[j];
            
            // 创建站点链接元素
            var siteLink = document.createElement('a');
            siteLink.href = site.url;
            siteLink.className = 'site-link';
            siteLink.target = '_blank'; // 新窗口打开
            
            // 站点名称
            var siteName = document.createElement('div');
            siteName.className = 'site-name';
            siteName.textContent = site.name;
            
            // 站点描述
            var siteDesc = document.createElement('div');
            siteDesc.className = 'site-desc';
            siteDesc.textContent = site.desc;
            
            // 组合元素
            siteLink.appendChild(siteName);
            siteLink.appendChild(siteDesc);
            linkList.appendChild(siteLink);
        }
    }
}

// 页面加载完成后初始化
window.onload = function() {
    loadNavigationData(function(data) {
        generateNavigationContent(data);
    });
};
