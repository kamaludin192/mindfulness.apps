-- Migration: Allow Superadmins to update any profile (role management)
DROP POLICY IF EXISTS "Superadmins can update all profiles" ON public.profiles;

CREATE POLICY "Superadmins can update all profiles" ON public.profiles
    FOR UPDATE
    USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
    )
    WITH CHECK (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
    );

-- Also allow superadmins to delete profiles if needed
DROP POLICY IF EXISTS "Superadmins can delete profiles" ON public.profiles;
CREATE POLICY "Superadmins can delete profiles" ON public.profiles
    FOR DELETE
    USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'superadmin')
    );
