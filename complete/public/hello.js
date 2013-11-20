Ext.define('Greeting', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ 'id', 'content' ]
    }
});

Ext.define('HelloView', {
    extend: 'Ext.Panel',
    config: {
        fullscreen: true,
        tpl: '<p>The ID is {id}</p><p>The content is {content}</p>'
    }
});

Ext.define('HelloStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Greeting',
        proxy: {
            type: 'rest',
            url: 'http://rest-service.guides.spring.io/greeting'
        }
    },
    constructor: function (config) {
        var name = document.location.search.slice(1);
        this.config.proxy.url = this.config.proxy.url
            + '?name=' + name;
        this.callParent(arguments);
    }
});

Ext.application({
    launch: function () {

        var panel = Ext.create('HelloView', {});

        Ext.create('HelloStore', {
            autoLoad: true,
            listeners: {
                load: function (self, records) {
                    panel.setData(records[0].getData());
                }
            }
        });

    }
});
