export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          subtitle: string | null
          author_name: string
          author_avatar_url: string
          image: string
          created_at: string
          updated_at: string
          tags: string[]
          snippet: string
          reading_time: number
          content: string
          published: boolean
          meta_title: string | null
          meta_description: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          subtitle?: string | null
          author_name?: string
          author_avatar_url?: string
          image: string
          created_at?: string
          updated_at?: string
          tags?: string[]
          snippet: string
          reading_time?: number
          content: string
          published?: boolean
          meta_title?: string | null
          meta_description?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          subtitle?: string | null
          author_name?: string
          author_avatar_url?: string
          image?: string
          created_at?: string
          updated_at?: string
          tags?: string[]
          snippet?: string
          reading_time?: number
          content?: string
          published?: boolean
          meta_title?: string | null
          meta_description?: string | null
        }
        Relationships: []
      }
      auto_blogs: {
        Row: {
          author: string | null
          category: string | null
          content: string
          created_at: string | null
          date: string | null
          description: string
          gallery_images: string[] | null
          has_3d_model: boolean | null
          has_charts: boolean | null
          has_flowchart: boolean | null
          has_gallery: boolean | null
          has_timeline: boolean | null
          id: string
          image: string | null
          is_published: boolean | null
          read_time: string | null
          search_query: string | null
          search_source: string | null
          title: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          date?: string | null
          description: string
          gallery_images?: string[] | null
          has_3d_model?: boolean | null
          has_charts?: boolean | null
          has_flowchart?: boolean | null
          has_gallery?: boolean | null
          has_timeline?: boolean | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          read_time?: string | null
          search_query?: string | null
          search_source?: string | null
          title: string
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          date?: string | null
          description?: string
          gallery_images?: string[] | null
          has_3d_model?: boolean | null
          has_charts?: boolean | null
          has_flowchart?: boolean | null
          has_gallery?: boolean | null
          has_timeline?: boolean | null
          id?: string
          image?: string | null
          is_published?: boolean | null
          read_time?: string | null
          search_query?: string | null
          search_source?: string | null
          title?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          form_type: string
          id: string
          message: string | null
          model_interest: string | null
          name: string | null
          notes: string | null
          role: string | null
          status: string
          use_case: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          form_type: string
          id?: string
          message?: string | null
          model_interest?: string | null
          name?: string | null
          notes?: string | null
          role?: string | null
          status?: string
          use_case?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          form_type?: string
          id?: string
          message?: string | null
          model_interest?: string | null
          name?: string | null
          notes?: string | null
          role?: string | null
          status?: string
          use_case?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
