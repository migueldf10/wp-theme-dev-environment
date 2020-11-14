<?php
    add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );
    function enqueue_parent_styles() {
        wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );
    }
    function mytheme_files() { 
        wp_enqueue_style('mytheme_main_style', get_theme_file_uri('app/css/styles.css')); 
    } 
    add_action('wp_enqueue_scripts', 'mytheme_files');
?>