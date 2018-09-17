
module.exports = function(grunt) {

    var public_modules = '/Storm/NongKun/public_modules';

    var paths = {
        "text":                  public_modules + "/frames/text/text",
        "css":                   public_modules + "/frames/require-css/css.min",
        "EChart":                public_modules + "/frames/EChart/dist/echarts",
        "chart":                 public_modules + "/frames/chart/dist/Chart.bundle",
        "fn.bootstrap":          public_modules + "/frames/bootstrap/dist/js/bootstrap",
        "fn.lazyload":           public_modules + "/frames/jquery_lazyload/jquery.lazyload",
        "fn.ajaxfileupload":     public_modules + "/frames/ajaxfileupload/ajaxfileupload.min",
        "fn.dotdotdot":          public_modules + "/frames/jQuery.dotdotdot/src/jquery.dotdotdot.min",
        "fn.scrollMonitor":      public_modules + "/frames/jquery.scrollMonitor/jquery.scrollMonitor.min",
        "fn.touchSlider":        public_modules + "/frames/jquery.touchSlider/jquery.touchSlider",
        "fn.mousewheel":         public_modules + "/frames/jquery-mousewheel/jquery.mousewheel.min",
        "fn.timeout":            public_modules + "/frames/jquery.timeout/dist/jquery.timeout.min",
        "fn.roller":             public_modules + "/frames/jquery.roller/dist/jquery.roller.min",
        "fn.picker":             public_modules + "/frames/jquery.picker/dist/jquery.picker.min",
        "fn.qrcode":             public_modules + "/frames/jquery-qrcode/dist/jquery-qrcode.min"
    };

    grunt.initConfig({

        config: {
            dev:    '../dev',
            final:  '../final',
            public: public_modules
        },

        sass:{
            app_mp:  {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd:    '<%=config.dev%>/app/mp/scss/page',
                    src:    '**/*.scss',
                    dest:   '<%=config.dev%>/app/mp/css/page',
                    extDot: 'last',
                    ext:    '.min.css'
                }]
            },
            app_pc:  {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd:    '<%=config.dev%>/app/pc/scss/page',
                    src:    '**/*.scss',
                    dest:   '<%=config.dev%>/app/pc/css/page',
                    extDot: 'last',
                    ext:    '.min.css'
                }]
            },
            app_fmp: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd:    '<%=config.dev%>/app/fmp/scss/page',
                    src:    '**/*.scss',
                    dest:   '<%=config.dev%>/app/fmp/css/page',
                    extDot: 'last',
                    ext:    '.min.css'
                }]
            }
        },

        uglify: {
            app_mp:  {
                options: { report: "min" },
                files: [{
                    expand: true,
                    cwd:    '<%=config.dev%>/app/mp/uglify',
                    src:    ['**/*.js', '!**/*.min.js'],
                    dest:   '<%=config.dev%>/app/mp/uglify',
                    extDot: 'last',
                    ext:    '.min.js'
                }]
            },
            app_pc:  {
                options: { report: "min" },
                files: [{
                    expand: true,
                    cwd:    '<%=config.dev%>/app/pc/uglify',
                    src:    ['**/*.js', '!**/*.min.js'],
                    dest:   '<%=config.dev%>/app/pc/uglify',
                    extDot: 'last',
                    ext:    '.min.js'
                }]
            },
            app_fmp: {
                options: { report: "min" },
                files: [{
                    expand: true,
                    cwd:    '<%=config.dev%>/app/fmp/uglify',
                    src:    ['**/*.js', '!**/*.min.js'],
                    dest:   '<%=config.dev%>/app/fmp/uglify',
                    extDot: 'last',
                    ext:    '.min.js'
                }]
            },
            pack_in: {
                options: { report: "min" },
                files: [{
                    expand: true,
                    cwd:    '<%=config.dev%>/pack/uglify',
                    src:    ['**/*.js', '!**/*.min.js'],
                    dest:   '<%=config.dev%>/pack/uglify',
                    extDot: 'last',
                    ext:    '.min.js'
                }]
            }
        },

        imagemin: {
            app_mp:  {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%=config.dev%>/app/mp/images',
                    src: ['**/*.{png,jpg,jpeg,gif,PNG,JPG,JPEG,GIF}'],
                    dest: '<%=config.dev%>/app/mp/images'
                }]
            },
            app_pc:  {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%=config.dev%>/app/pc/images',
                    src: ['**/*.{png,jpg,jpeg,gif,PNG,JPG,JPEG,GIF}'],
                    dest: '<%=config.dev%>/app/pc/images'
                }]
            },
            app_fmp: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%=config.dev%>/app/fmp/images',
                    src: ['**/*.{png,jpg,jpeg,gif,PNG,JPG,JPEG,GIF}'],
                    dest: '<%=config.dev%>/app/fmp/images'
                }]
            },
            pack_in: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%=config.dev%>/pack/images',
                    src: ['**/*.{png,jpg,jpeg,gif,PNG,JPG,JPEG,GIF}'],
                    dest: '<%=config.dev%>/pack/images'
                }]
            }
        },

        requirejs: {
            app_mp:   {
                options: {
                    dir:               "<%=config.final%>/app/mp",
                    appDir:            "<%=config.dev%>/app/mp",
                    baseUrl:           "./scripts2/",
                    mainConfigFile:    "<%=config.dev%>/app/mp/scripts2/config/init/init-require.js",
                    optimizeCss:       "standard",
                    optimize:          "uglify",
                    keepBuildDir:       true,
                    removeCombined:     false,
                    paths:              paths,
                    uglify: {
                        toplevel:      true,
                        ascii_only:    true,
                        beautify:      true,
                        max_line_length:  1000
                    },
                    modules: [
                        { exclude: Object.keys(paths), name: "page.address.edit.1" },
                        { exclude: Object.keys(paths), name: "page.address.manage.1" },
                        { exclude: Object.keys(paths), name: "page.apply.1" },
                        { exclude: Object.keys(paths), name: "page.bindInvitation.1" },
                        { exclude: Object.keys(paths), name: "page.bindMobile.1" },
                        { exclude: Object.keys(paths), name: "page.discount.1" },
                        { exclude: Object.keys(paths), name: "page.forgetPassword.1" },
                        { exclude: Object.keys(paths), name: "page.login.1" },
                        { exclude: Object.keys(paths), name: "page.logistics.1" },
                        { exclude: Object.keys(paths), name: "page.nav.1" },
                        { exclude: Object.keys(paths), name: "page.orderConfirm.1" },
                        { exclude: Object.keys(paths), name: "page.orderDetail.1" },
                        { exclude: Object.keys(paths), name: "page.orderList.1" },
                        { exclude: Object.keys(paths), name: "page.personal.center.1" },
                        { exclude: Object.keys(paths), name: "page.personal.information.1" },
                        { exclude: Object.keys(paths), name: "page.register.1" },
                        { exclude: Object.keys(paths), name: "page.searchProduct.1" },
                        { exclude: Object.keys(paths), name: "page.share.1" },
                        { exclude: Object.keys(paths), name: "page.shoppingCart.1" },
                        { exclude: Object.keys(paths), name: "page.wechat.transfer.1" }
                    ]
                }
            },
            app_pc:   {
                options: {
                    dir:               "<%=config.final%>/app/pc",
                    appDir:            "<%=config.dev%>/app/pc",
                    optimizeCss:       "standard",
                    optimize:          "uglify",
                    keepBuildDir:       true,
                    removeCombined:     false,
                    uglify: {
                        toplevel:      true,
                        ascii_only:    true,
                        beautify:      true,
                        max_line_length:  1000
                    }
                }
            },
            app_fmp:  {
                options: {
                    dir:               "<%=config.final%>/app/fmp",
                    appDir:            "<%=config.dev%>/app/fmp",
                    baseUrl:           "./scripts2/",
                    mainConfigFile:    "<%=config.dev%>/app/fmp/scripts2/config/init/init-require.js",
                    optimizeCss:       "standard",
                    optimize:          "uglify",
                    keepBuildDir:       true,
                    removeCombined:     false,
                    paths:              paths,
                    uglify: {
                        toplevel:      true,
                        ascii_only:    true,
                        beautify:      true,
                        max_line_length:  1000
                    },
                    modules: [
                        { exclude: Object.keys(paths), name: "page.address.edit.1" },
                        { exclude: Object.keys(paths), name: "page.address.manage.1" },
                        { exclude: Object.keys(paths), name: "page.bindInvitation.1" },
                        { exclude: Object.keys(paths), name: "page.bindMobile.1" },
                        { exclude: Object.keys(paths), name: "page.discount.1" },
                        { exclude: Object.keys(paths), name: "page.forgetPassword.1" },
                        { exclude: Object.keys(paths), name: "page.login.1" },
                        { exclude: Object.keys(paths), name: "page.logistics.1" },
                        { exclude: Object.keys(paths), name: "page.orderConfirm.1" },
                        { exclude: Object.keys(paths), name: "page.orderDetail.1" },
                        { exclude: Object.keys(paths), name: "page.orderList.1" },
                        { exclude: Object.keys(paths), name: "page.personal.center.1" },
                        { exclude: Object.keys(paths), name: "page.personal.information.1" },
                        { exclude: Object.keys(paths), name: "page.register.1" },
                        { exclude: Object.keys(paths), name: "page.searchProduct.1" },
                        { exclude: Object.keys(paths), name: "page.shoppingCart.1" },
                        { exclude: Object.keys(paths), name: "page.wechat.transfer.1" }
                    ]
                }
            },
            data_in:  {
                options: {
                    dir:               "<%=config.final%>/data",
                    appDir:            "<%=config.dev%>/data",
                    optimizeCss:       "standard",
                    optimize:          "uglify",
                    keepBuildDir:       true,
                    removeCombined:     false,
                    uglify: {
                        toplevel:      true,
                        ascii_only:    true,
                        beautify:      true,
                        max_line_length:  1000
                    }
                }
            },
            pack_in:  {
                options: {
                    dir:               "<%=config.final%>/pack",
                    appDir:            "<%=config.dev%>/pack",
                    optimizeCss:       "standard",
                    optimize:          "uglify",
                    keepBuildDir:       true,
                    removeCombined:     false,
                    uglify: {
                        toplevel:      true,
                        ascii_only:    true,
                        beautify:      true,
                        max_line_length:  1000
                    }
                }
            }
        },

        connect: {
            app_mp:  {
                options: {
                    port: 8081,
                    open: false,
                    livereload: false,
                    useAvailablePort: false,
                    keepalive: false,
                    base: [
                        '<%=config.dev%>/pack/region/native/mp',
                        '<%=config.dev%>/app/mp/web',
                        '<%=config.dev%>/app/mp/web2',
                        '<%=config.dev%>/app/mp/',
                        '<%=config.public%>'
                    ]
                }
            },
            app_pc:  {
                options: {
                    port: 8082,
                    open: false,
                    livereload: false,
                    useAvailablePort: false,
                    keepalive: false,
                    base: [
                        '<%=config.dev%>/pack/region/native/pc',
                        '<%=config.dev%>/app/pc/web',
                        '<%=config.dev%>/app/pc/',
                        '<%=config.public%>'
                    ]
                }
            },
            app_fmp: {
                options: {
                    port: 8083,
                    open: false,
                    livereload: false,
                    useAvailablePort: false,
                    keepalive: true,
                    base: [
                        '<%=config.dev%>/pack/region/native/fmp',
                        '<%=config.dev%>/app/fmp/web',
                        '<%=config.dev%>/app/mp/web2',
                        '<%=config.dev%>/app/fmp/',
                        '<%=config.public%>'
                    ]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['connect']);

};

