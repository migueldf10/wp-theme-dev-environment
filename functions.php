<?php
    function mytheme_files() { 
        wp_enqueue_style('mytheme_main_style', get_theme_file_uri('dist/theme.css')); 
    } 
    add_action('wp_enqueue_scripts', 'mytheme_files');
?>