CKEDITOR.replace( 'editor1', {
    removePlugins: ['sourcearea', 'about'],} );
$("#maximize").on('click', function(){
    CKEDITOR.instances.editor1.execCommand('maximize');
});